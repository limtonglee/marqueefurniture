// Entry Point of the API Server

const express = require("express");
var cors = require("cors");

/* Creates an Express application. 
   The express() function is a top-level 
   function exported by the express module.
*/
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  dialect: "postgres",
  port: 5432,
});

/* To handle the HTTP Methods Body Parser 
   is used, Generally used to extract the 
   entire body portion of an incoming 
   request stream and exposes it on req.body 
*/
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const usersDb = require("./routes/users");

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to Database !");
  });
});

app.get("/users", (req, res, next) => {
  console.log("TEST DATA :");
  pool.query("Select * from users").then((testData) => {
    console.log(testData);
    res.send(testData.rows);
  });
});

// Require the Routes API
// Create a Server and run it on the port 3000
const server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Starting the Server at the port 8080");
});

/* Users */

//Create New User Account
app.post("/api/user/signup", (req, res, next) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.username;
    const email = req.body.email;
    const contactNumber = req.body.contactNumber;
    const password = req.body.password;
    const address = req.body.address;

    const text = `
            INSERT INTO Users (firstName, lastName, username, email, contactNumber, password, address)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

    const values = [
      firstName,
      lastName,
      userName,
      email,
      contactNumber,
      password,
      address,
    ];

    pool.query(text, values).then((testData) => {
      res.status(200).send("User successfully added");
    });
  } catch (error) {
    return res.send(error);
  }
});

/* Tags */
//Get all Tags
app.get("/api/tags", (req, res, next) => {
  try {
    const text = `
        SELECT * from PostTags;
        `;

    pool.query(text, values).then((testData) => {
      res.status(200).send("User successfully added");
    });
  } catch (error) {
    return res.send(error);
  }
});

//User login
app.post("/api/user/login", (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const text = `
            SELECT *
            FROM Users as u
            WHERE u.email = $1 and u.password = $2;
        `;

    const values = [email, password];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Forget password
app.put("/api/user/forgetpw", (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const text = `
            UPDATE Users
            SET password = $2
            WHERE email = $1;
        `;

    const values = [email, password];

    pool.query(text, values).then((testData) => {
      res.status(200).send("User have successfully changed his/her password!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//View profile
app.get("/api/user/profile", (req, res, next) => {
  try {
    const userId = req.query.userId;

    const text = `
            SELECT * 
            FROM Users as u
            WHERE u.id = $1;
        `;

    const values = [userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Edit profile
// app.put('/api/user/editProfile', (req, res, next) => {
//     try {
//         const email = req.body.email
//         const password = req.body.password

//         const text = `
//             UPDATE Users
//             SET password = $2
//             WHERE email = $1;
//         `;

//         const values = [email, password]

//         pool.query(text, values)
//             .then(testData => {
//                 res.status(200).send('User have successfully changed his/her password!')
//             })
//     }
//     catch (error) {
//         return res.send(error)
//     }
// })

//Create seller account
app.post("/api/user/createSellerAccount", (req, res, next) => {
  try {
    const userId = req.body.userId;
    const name = req.body.name;
    const website = req.body.website;
    const description = req.body.description;

    const text = `
            INSERT INTO Shop (name, website, description, userId) 
            VALUES ($2, $3, $4, $1);
        `;

    const values = [userId, name, website, description];

    pool.query(text, values).then((testData) => {
      res.status(200).send("User have successfully created seller account!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Edit seller account
app.put("/api/user/editSellerAccount", (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const name = req.body.name;
    const website = req.body.website;
    const description = req.body.description;

    const text = `
            UPDATE Shop
            SET name = $2, website = $3, description = $4
            WHERE id = $1;
        `;

    const values = [shopId, name, website, description];

    pool.query(text, values).then((testData) => {
      res.status(200).send("User have successfully edited seller account!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get username by userid
app.get("/api/user", (req, res, next) => {
  try {
    const userId = req.query.userId;

    const text = `
            SELECT u.username
            FROM Users as u
            WHERE u.id = $1
        `;

    const values = [userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get profile pic by userid
app.get("/api/user/profilepic", (req, res, next) => {
  try {
    const userId = req.query.userId;

    const text = `
            SELECT u.profilepic
            FROM Users as u
            WHERE u.id = $1
        `;

    const values = [userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

/* Tags */
//Get all Tags
app.get("/api/tags", (req, res, next) => {
  try {
    const text = `
        SELECT * from PostTags;
        `;

    pool.query(text).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

/* Listing */

//Get all listings
app.get("/api/listings", (req, res, next) => {
  try {
    const text = `
        SELECT * from listing;
        `;

    pool.query(text).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get listing details for a particular listing
app.get("/api/listing/details", (req, res, next) => {
  try {
    const listingId = req.query.listingId;

    const text = `
        SELECT * from listing
        WHERE id = $1;
        `;

    const values = [listingId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get all listings for a particular shop
app.get("/api/listings/shop", (req, res, next) => {
  try {
    const shopId = req.query.shopId;

    const text = `
        SELECT * from listing
        WHERE shopId = $1;
        `;

    const values = [shopId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Post a like when user likes a listing
app.post("/api/listing/like", (req, res, next) => {
  try {
    const userId = req.body.userId;
    const listingId = req.body.listingId;

    const text = `
        INSERT INTO ListingLikes (listingId, userId) 
        VALUES ($1, $2)
        `;

    const values = [listingId, userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Liked user succesfully stored!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Delete a like when user unlikes a post
app.delete("/api/listing/unlike", (req, res, next) => {
  try {
    const userId = req.query.userId;
    const listingId = req.query.listingId;

    const text = `
        DELETE FROM ListingLikes
        WHERE listingId = $1 and userId = $2;
        `;

    const values = [listingId, userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("User successfully unliked post!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get all users for a listing
app.get("/api/listing/allLikes", (req, res, next) => {
  try {
    const listingId = req.query.listingId;

    const text = `
        SELECT u.username 
        FROM ListingLikes as ll 
        INNER JOIN Users as u
        ON ll.userId = u.id
        WHERE ll.listingId = $1;
        `;

    const values = [listingId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get all liked listings for a user
app.get("/api/listing/allLikes/user", (req, res, next) => {
  try {
    const userId = req.query.userId;

    const text = `
        SELECT ll.listingId 
        FROM ListingLikes as ll 
        WHERE ll.userId = $1;
        `;

    const values = [userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

/* Post */

//Get all posts
app.get("/api/posts", (req, res, next) => {
  try {
    const text = `
        SELECT *
        from post as p;
        `;

    pool.query(text).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get individual post details
app.get("/api/post/details", (req, res, next) => {
  try {
    const postId = req.query.postId;

    const text = `
        SELECT p.id, p.image, p.description, p.isPrivate, p.userId
        from post as p
        WHERE p.id = $1;
        `;

    const values = [postId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

// //Get all posts for users
// app.get('/api/post/details', (req, res, next) => {
//     try {

//         const postId = req.query.postId

//         const text = `
//         SELECT p.id, p.image, p.description, p.isPrivate, p.userId
//         from post as p
//         WHERE p.id = $1;
//         `;

//         const values = [postId]

//         pool.query(text, values)
//             .then(testData => {
//                 res.status(200).send(testData.rows);
//             })
//     }
//     catch (error) {
//         return res.send(error)
//     }
// })

//Get tags for individual post
app.get("/api/post/tags", (req, res, next) => {
  try {
    const postId = req.query.postId;

    const text = `
        SELECT pt.tagName 
        from PostTags as pt
        INNER JOIN PostTagsJoinTable as ptjt
        ON ptjt.postTagsId = pt.id
        WHERE ptjt.postId = $1;
        `;

    const values = [postId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get likes for individual post
app.get("/api/post/likes", (req, res, next) => {
  try {
    const postId = req.query.postId;

    const text = `
        SELECT u.username
        from Users as u
        INNER JOIN PostLikes as pl
        ON u.id = pl.userId
        WHERE pl.postId = $1;
        `;

    const values = [postId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get comments for individual post
app.get("/api/post/comments", (req, res, next) => {
  try {
    const postId = req.query.postId;

    const text = `
        SELECT pc.id, pc.comment, pc.dateTime, u.username
        from PostComments as pc
        INNER JOIN Users as u
        ON u.id = pc.userId
        WHERE pc.postId = $1;
        `;

    const values = [postId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get listings for individual post
app.get("/api/post/listings", (req, res, next) => {
  try {
    const postId = req.query.postId;

    const text = `
        SELECT *
        from Listing as l
        INNER JOIN ListingPostJoinTable as lpjt
        ON l.id = lpjt.listingId
        WHERE lpjt.postId = $1;
        `;

    const values = [postId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get All Posts for a user
app.get("/api/post/user", (req, res, next) => {
  try {
    const userId = req.query.userId;

    const text = `
        SELECT *
        FROM Post
        WHERE userId = $1;
        `;

    const values = [userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Like a post
app.post("/api/post/like", (req, res, next) => {
  try {
    const postId = req.body.postId;
    const userId = req.body.userId;

    const text = `
        INSERT INTO PostLikes (userId, postId)
        VALUES ($1, $2);
        `;

    const values = [postId, userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Post has been liked successfully!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Unlike a post
app.delete("/api/post/unlike", (req, res, next) => {
  try {
    const postId = req.query.postId;
    const userId = req.query.userId;

    const text = `
        DELETE FROM PostLikes
        WHERE postId = $1 and userId = $2;
        `;

    const values = [postId, userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Post has been unliked successfully!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Create comment for post
app.post("/api/post/createComment", (req, res, next) => {
  try {
    const comment = req.body.comment;
    const userId = req.body.userId;
    const postId = req.body.postId;
    const dateTime = new Date();

    const text = `
        INSERT INTO PostComments (userId, postId, comment, dateTime)
        VALUES ($2, $1, $3, $4);
        `;

    const values = [postId, userId, comment, dateTime];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Comment has been saved successfully!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Delete comment for post
app.delete("/api/post/deleteComment", (req, res, next) => {
  try {
    const commentId = req.query.commentId;

    const text = `
        DELETE FROM PostComments
        WHERE id = $1
        `;

    const values = [commentId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Comment has been deleted successfully!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Add post to moodboard
app.post("/api/post/addPostToMoodboard", (req, res, next) => {
  try {
    const postId = req.body.postId;
    const moodBoardId = req.body.moodBoardId;

    const text = `
        INSERT INTO MoodBoardPostJoinTable (moodBoardId, postId)
        VALUES ($2, $1);
        `;

    const values = [postId, moodBoardId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Post has been added to moodboard successfully!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Delete post from moodboard
app.delete("/api/post/deletePostFromMoodboard", (req, res, next) => {
  try {
    const postId = req.query.postId;
    const moodBoardId = req.query.moodBoardId;

    const text = `
        DELETE FROM MoodBoardPostJoinTable
        WHERE postId = $1 and moodBoardId = $2;
        `;

    const values = [postId, moodBoardId];

    pool.query(text, values).then((testData) => {
      res
        .status(200)
        .send("Post has been deleted from moodboard successfully!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Create new post
app.post("/api/post/create", (req, res, next) => {
  try {
    const image = req.body.image;
    const description = req.body.description;
    const isPrivate = req.body.isPrivate;
    const userId = req.body.userId;

    const text = `
        INSERT INTO Post (image, description, isPrivate, userId)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;

    const values = [image, description, isPrivate, userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

// //Link new Post to listings
// app.post('/api/post/', (req, res, next) => {
//     try {

//         const postId = req.body.postId;
//         const listingId = req.body.listingId;

//         const text = `
//         INSERT INTO Post (image, description, isPrivate, userId)
//         VALUES ($1, $2, $3, $4)
//         RETURNING *;
//         `;

//         const values = [image, description, isPrivate, userId]

//         pool.query(text, values)
//             .then(testData => {
//                 res.status(200).send(testData.rows);
//             })
//     }
//     catch (error) {
//         return res.send(error)
//     }
// })

/* Moodboard */

//Get moodboards for a user
app.get("/api/user/moodboards", (req, res, next) => {
  try {
    const userId = req.query.userId;

    const text = `
        SELECT *
        from MoodBoard as mb
        WHERE mb.userId = $1;
        `;

    const values = [userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get posts for a moodboard
app.get("/api/user/moodboards/post", (req, res, next) => {
  try {
    const moodBoardId = req.query.moodBoardId;

    const text = `
        SELECT p.id, p.image, p.description
        from Post as p
        INNER JOIN MoodBoardPostJoinTable as mpjt
        ON p.id = mpjt.postId
        WHERE mpjt.moodBoardId = $1;
        `;

    const values = [moodBoardId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Add new moodboard
app.post("/api/user/moodboard/create", (req, res, next) => {
  try {
    const boardName = req.body.boardName;
    const description = req.body.description;
    const isPrivate = req.body.isPrivate;
    const userId = req.body.userId;

    const text = `
        INSERT INTO MoodBoard (boardName, description, isPrivate, userId)
        VALUES ($1, $2, $3, $4);
        `;

    const values = [boardName, description, isPrivate, userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("You have created a moodboard successfully!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Edit moodboard details
app.put("/api/user/moodboard/edit", (req, res, next) => {
  try {
    const moodBoardId = req.body.moodBoardId;
    const boardName = req.body.boardName;
    const description = req.body.description;

    const text = `
        UPDATE MoodBoard
        SET boardName = $1, description = $2
        WHERE id = $3;
        `;

    const values = [boardName, description, moodBoardId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("You have edited a moodboard successfully!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Delete moodboard
app.delete("/api/user/moodboard/delete", (req, res, next) => {
  try {
    const moodboardId = req.query.moodboardId;

    const text = `
        DELETE FROM MoodBoard
        WHERE id = $1;
        `;

    const values = [moodboardId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("You have deleted a moodboard successfully!");
    });
  } catch (error) {
    return res.send(error);
  }
});
/* Merchant */

//Get seller profile
app.get("/api/merchant/sellerProfile", (req, res, next) => {
  try {
    const userId = req.query.userId;

    const text = `
          SELECT * 
          FROM Shop
          WHERE userId = $1
          `;

    const values = [userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get listings for merchant
app.get("/api/merchant/listings", (req, res, next) => {
  try {
    const userId = req.query.userId;

    const text = `
        SELECT l.id, l.name, l.image, l.description, l.category, l.brand, l.type,
        l.warrantyInfo, l.shippingProvider, l.parcelSize, l.weight, l.stockAvailable,
        l.listingPrice, l.variations, l.dimensions, l.sales, l.status, l.shopId, l.packageId, l.designId 
        FROM Listing as l
        INNER JOIN Shop as s
        ON l.shopId = s.id
        WHERE s.userId = $1;
        `;

    const values = [userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Create listing
app.post("/api/merchant/createListing", (req, res, next) => {
  try {
    const type = req.body.type;

    if (type == "Furniture") {
      const name = req.body.name;
      const image = req.body.image;
      const description = req.body.description;
      const category = req.body.category;
      const brand = req.body.brand;
      const warrantyInfo = req.body.warrantyInfo;
      const shippingProvider = req.body.shippingProvider;
      const parcelSize = req.body.parcelSize;
      const weight = req.body.weight;
      const stockAvailable = req.body.stockAvailable;
      const listingPrice = req.body.listingPrice;
      const variations = req.body.variations;
      const dimensions = req.body.dimensions;
      const status = req.body.status;
      const shopId = req.body.shopId;

      const text = `
            INSERT INTO Listing (name, image, description, category, brand, warrantyInfo, 
            shippingProvider, parcelSize, weight, stockAvailable, listingPrice, variations,
            dimensions, sales, status, shopId, type)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 0, $15, $16, $17);
            `;

      const values = [
        name,
        image,
        description,
        category,
        brand,
        warrantyInfo,
        shippingProvider,
        parcelSize,
        weight,
        stockAvailable,
        listingPrice,
        variations,
        dimensions,
        status,
        shopId,
        type,
      ];

      pool.query(text, values).then((testData) => {
        res.status(200).send("You have successfully added a listing!");
      });
    } else if (type == "Service") {
      const name = req.body.name;
      const image = req.body.image;
      const description = req.body.description;
      const category = req.body.category;
      const listingPrice = req.body.listingPrice;
      const status = req.body.status;
      const shopId = req.body.shopId;

      const text = `
            INSERT INTO Listing (name, image, description, category, listingPrice, sales, status, shopId, type)
            VALUES ($1, $2, $3, $4, $5, 0, $7, $8, $9);
            `;

      const values = [
        name,
        image,
        description,
        category,
        listingPrice,
        status,
        shopId,
        type,
      ];

      pool.query(text, values).then((testData) => {
        res.status(200).send("You have successfully added a listing!");
      });
    } else if (type == "Design") {
      const name = req.body.name;
      const image = req.body.image;
      const description = req.body.description;
      const category = req.body.category;
      const status = req.body.status;
      const shopId = req.body.shopId;

      const text = `
            INSERT INTO Listing (name, image, description, category, status, shopId, type)
            VALUES ($1, $2, $3, $4, $5, $6, $7);
            `;

      const values = [name, image, description, category, status, shopId, type];

      pool.query(text, values).then((testData) => {
        res.status(200).send("You have successfully added a listing!");
      });
    }
  } catch (error) {
    return res.send(error);
  }
});

//Edit listing
app.put("/api/merchant/editListing", (req, res, next) => {
  try {
    const type = req.body.type;
    const listingId = req.body.listingId;

    if (type == "Furniture") {
      const name = req.body.name;
      const image = req.body.image;
      const description = req.body.description;
      const category = req.body.category;
      const brand = req.body.brand;
      const warrantyInfo = req.body.warrantyInfo;
      const shippingProvider = req.body.shippingProvider;
      const parcelSize = req.body.parcelSize;
      const weight = req.body.weight;
      const stockAvailable = req.body.stockAvailable;
      const listingPrice = req.body.listingPrice;
      const variations = req.body.variations;
      const dimensions = req.body.dimensions;
      const status = req.body.status;

      const text = `
            UPDATE Listing
            SET name = $1, image = $2, description = $3, category = $4, brand = $5,
            warrantyInfo = $6, shippingProvider = $7, parcelSize = $8, weight = $9,
            stockAvailable = $10, listingPrice = $11, variations = $12, dimensions =$13,
            status = $14, type = $15
            WHERE id = $16;
            `;

      const values = [
        name,
        image,
        description,
        category,
        brand,
        warrantyInfo,
        shippingProvider,
        parcelSize,
        weight,
        stockAvailable,
        listingPrice,
        variations,
        dimensions,
        status,
        type,
        listingId,
      ];

      pool.query(text, values).then((testData) => {
        res.status(200).send("You have successfully edited a listing!");
      });
    } else if (type == "Service") {
      const name = req.body.name;
      const image = req.body.image;
      const description = req.body.description;
      const category = req.body.category;
      const listingPrice = req.body.listingPrice;
      const status = req.body.status;

      const text = `
            UPDATE Listing
            SET name = $1, image = $2, description = $3, category = $4, listingPrice = $5,
            status = $6, type = $7
            WHERE id = $8;
            `;

      const values = [
        name,
        image,
        description,
        category,
        listingPrice,
        status,
        type,
        listingId,
      ];

      pool.query(text, values).then((testData) => {
        res.status(200).send("You have successfully edited a listing!");
      });
    } else if (type == "Design") {
      const name = req.body.name;
      const image = req.body.image;
      const description = req.body.description;
      const category = req.body.category;
      const status = req.body.status;

      const text = `
            UPDATE Listing
            SET name = $1, image = $2, description = $3, category = $4
            status = $5, type = $6
            WHERE id = $7;
            `;

      const values = [
        name,
        image,
        description,
        category,
        status,
        type,
        listingId,
      ];

      pool.query(text, values).then((testData) => {
        res.status(200).send("You have successfully edited a listing!");
      });
    }
  } catch (error) {
    return res.send(error);
  }
});

//Get listing details for individual listing
app.get("/api/merchant/listing/individual", (req, res, next) => {
  try {
    const listingId = req.query.listingId;

    const text = `
        SELECT * 
        FROM Listing as l
        WHERE l.id = $1;
        `;

    const values = [listingId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get all orders for merchant
app.get("/api/merchant/orders", (req, res, next) => {
  try {
    const sellerId = req.query.sellerId;

    const text = `
        SELECT o.id, o.address, o.message, o.trackingNumber,
        o.order_status, o.design_order_status, o.price,
        o.dateTime, u.username, u.profilePic, l.name, l.image,
        l.shippingProvider, l.variations
        FROM Orders as o
        INNER JOIN Users as u 
        ON o.buyerId = u.id
        INNER JOIN Listing as l
        ON o.listingId = l.id
        WHERE o.sellerId = $1;
        `;

    const values = [sellerId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Update Merchant Order
// app.put("/api/merchant/updateOrder", (req, res, next) => {
//     try {
//       const orderId = req.body.orderId;

//       const text = `
//           UPDATE Reviews
//           SET sellerReply = $2
//           WHERE id = $1;
//           `;

//       const values = [reviewId, sellerReply];

//       pool.query(text, values).then((testData) => {
//         res.status(200).send("Merchant successfully replied!");
//       });
//     } catch (error) {
//       return res.send(error);
//     }
//   });

//Get order details for individual order
app.get("/api/merchant/order/individual", (req, res, next) => {
  try {
    const orderId = req.query.orderId;

    const text = `
        SELECT * 
        FROM Orders as o
        WHERE o.id = $1;
        `;

    const values = [orderId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

// //Get product review for merchant
// app.get('/api/merchant/product/review', (req, res, next) => {
//     try {

//         const orderId = req.query.orderId;

//         const text = `
//         SELECT *
//         FROM Orders as o
//         WHERE o.id = $1;
//         `;

//         const values = [orderId]

//         pool.query(text, values)
//             .then(testData => {
//                 res.status(200).send(testData.rows);
//             })
//     }
//     catch (error) {
//         return res.send(error)
//     }
// })

//Reply review for merchant
app.put("/api/merchant/replyReview", (req, res, next) => {
  try {
    const reviewId = req.body.reviewId;
    const sellerReply = req.body.sellerReply;

    const text = `
        UPDATE Reviews
        SET sellerReply = $2
        WHERE id = $1;
        `;

    const values = [reviewId, sellerReply];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Merchant successfully replied!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get shop categories
app.get("/api/merchant/shopCategories", (req, res, next) => {
  try {
    const userId = req.query.userId;

    const text = `
        SELECT sc.id, sc.name, sc.shopId
        FROM ShopCategory as sc
        INNER JOIN Shop as s
        ON sc.shopId = s.id
        WHERE s.userId = $1;
        `;

    const values = [userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Add shop category
app.post("/api/merchant/shopCategories/add", (req, res, next) => {
  try {
    const name = req.body.name;
    const shopId = req.body.shopId;

    const text = `
        INSERT INTO ShopCategory (name, shopId)
        VALUES ($1, $2);
        `;

    const values = [name, shopId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Shop category successfully added!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Edit shop category
app.put("/api/merchant/shopCategories/edit", (req, res, next) => {
  try {
    const shopCategoryId = req.body.shopCategoryId;
    const name = req.body.name;

    const text = `
      UPDATE ShopCategory
      SET name = $2
      WHERE id = $1;
          `;

    const values = [shopCategoryId, name];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Shop category successfully updated!");
    });
  } catch (error) {
    return res.send(error);
  }
});

app.put("/api/merchant/shopCategoryListing/edit", (req, res, next) => {
  try {
    const shopCategoryId = req.body.shopCategoryId;
    const listingId = req.body.listingId;

    const text = `
        UPDATE ShopCategoryListings
        SET listingId = $2
        WHERE shopCategoryId = $1;
            `;

    const values = [shopCategoryId, listingId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Shop category listing successfully updated!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Delete shop category
app.delete("/api/merchant/shopCategories/delete", (req, res, next) => {
  try {
    const shopCategoryId = req.query.shopCategoryId;

    const text = `
      DELETE FROM ShopCategory
      WHERE id = $1;
          `;

    const values = [shopCategoryId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Shop category successfully deleted!");
    });
  } catch (error) {
    return res.send(error);
  }
});

app.delete("/api/merchant/shopCategoryListings/delete", (req, res, next) => {
  try {
    const shopCategoryId = req.query.shopCategoryId;

    const text = `
        DELETE FROM ShopCategoryListings
        WHERE shopCategoryId = $1;
            `;

    const values = [shopCategoryId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Shop category listings successfully deleted!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Add listing to shop category
app.post("/api/merchant/shopCategories/addListing", (req, res, next) => {
  try {
    const shopCategoryId = req.body.shopCategoryId;
    const listingId = req.body.listingId;

    const text = `
        INSERT INTO ShopCategoryListings (shopCategoryId, listingId)
        VALUES ($1, $2);
        `;

    const values = [shopCategoryId, listingId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("Shop category and listing successfully added!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Create voucher 
app.post("/api/merchant/voucher/add", (req, res, next) => {
    try {
        const name = req.body.name;
        const minSpend = req.body.minSpend;
        const discountAmount = req.body.discountAmount;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const status = req.body.status;
        const shopId = req.body.shopId;
  
      const text = `
          INSERT INTO SellerVoucher (name, minSpend, discountAmount, startDate, endDate, status, shopId)
          VALUES ($1, $2, $3, $4, $5, $6, $7);
          `;
  
      const values = [name, minSpend, discountAmount, startDate, endDate, status, shopId];
  
      pool.query(text, values).then((testData) => {
        res.status(200).send("Voucher successfully added!");
      });
    } catch (error) {
      return res.send(error);
    }
  });
  

//Get vouchers
app.get("/api/merchant/vouchers", (req, res, next) => {
  try {

    const shopId = req.query.shopId;

    const text = `
          SELECT * 
          FROM SellerVoucher
          WHERE shopId = $1;
          `;

    const values = [shopId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

//Edit voucher
app.put("/api/merchant/voucher/edit", (req, res, next) => {
  try {
    const voucherId = req.query.voucherId;
    console.log('ZZZ', voucherId);
    const name = req.body.name;
    const minSpend = req.body.minSpend;
    const discountAmount = req.body.discountAmount;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const status = req.body.status;
    console.log('ZZZ', req.body);
    const text = `
        UPDATE SellerVoucher
        SET name = $2, minSpend = $3, discountAmount = $4, startDate = $5, 
        endDate = $6, status = $7
        WHERE id = $1;
            `;

    const values = [voucherId, name, minSpend, discountAmount, startDate, endDate, status];
    console.log('ZZZ', values);
    pool.query(text, values).then((testData) => {
      res.status(200).send("Voucher has been successfully updated!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Delete voucher
app.delete("/api/merchant/voucher/delete", (req, res, next) => {
    try {
      const voucherId = req.query.voucherId;
  
      const text = `
          DELETE FROM SellerVoucher
          WHERE id = $1;
              `;
  
      const values = [voucherId];
  
      pool.query(text, values).then((testData) => {
        res.status(200).send("Voucher successfully deleted!");
      });
    } catch (error) {
      return res.send(error);
    }
  });

// THIS THE ONE THAT WORKS FOR STANDALONE
// // Create new chat conversation
// app.post("/api/chat/create", (req, res, next) => {
//   try {
//     const creationDateTime = new Date();

//     const text = `
//         INSERT INTO Chat(creationDateTime) VALUES ($1) RETURNING id;
//         `;

//     const values = [creationDateTime];

//     pool.query(text, values).then((testData) => {
//       // console.log(testData.rows[0]["id"]);
//       // res.status(200).send(JSON.stringify(testData.rows[0]["id"]));
//       res.status(200).json(testData.rows[0]["id"]);
//     });
//   } catch (error) {
//     return res.send(error);
//   }
// });

// THIS THE ONE THAT WORKS FOR STANDALONE
// Create new chat conversation - link users to chat
// app.post("/api/chat/linkusertochat", (req, res, next) => {
//   try {
//     const chatId = req.body.chatId;
//     const senderId = req.body.senderId;
//     const receiverId = req.body.receiverId;

//     const text = `
//         INSERT INTO ChatUserJoinTable (chatId, userId)
//         VALUES ($1, $2);
//         `;

//     const values1 = [chatId, senderId];
//     const values2 = [chatId, receiverId];

//     pool.query(text, values1).then(
//       pool.query(text, values2).then((testData) => {
//         res
//           .status(200)
//           .send("Both users have been linked to the chat successfully!");
//       })
//     );
//   } catch (error) {
//     return res.send(error);
//   }
// });

// THE ONE THAT WORKS - COMBINATION OF ALL QUERIES
// Create new chat conversation
// app.post("/api/chat/create", (req, res, next) => {
//   try {
//     const creationDateTime = new Date();

//     const query1 = `
//         INSERT INTO Chat(creationDateTime) VALUES ($1) RETURNING id;
//         `;

//     const values1 = [creationDateTime];

//     pool.query(query1, values1).then((testData) => {
//       const chatId = testData.rows[0]["id"];
//       const senderId = req.body.senderId;
//       const receiverId = req.body.receiverId;

//       const query2 = `
//         INSERT INTO ChatUserJoinTable (chatId, userId)
//         VALUES ($1, $2);
//         `;

//       const values2 = [chatId, senderId];
//       const values3 = [chatId, receiverId];

//       pool.query(query2, values2).then(
//         pool.query(query2, values3).then((testData) => {
//           res.status(200).send("New chat created successfully!");
//         })
//       );
//     });
//   } catch (error) {
//     return res.send(error);
//   }
// });

/* Chat */

// Create new chat conversation
app.post("/api/chat/create", (req, res, next) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const text = `
        INSERT INTO Chat (firstUserId, secondUserId)
        VALUES ($1, $2);
        `;

    const values = [senderId, receiverId];

    pool.query(text, values).then((testData) => {
      res.status(200).send("You have created a moodboard successfully!");
    });
  } catch (error) {
    return res.send(error);
  }
});

//Get user's chats
app.get("/api/user/chats", (req, res, next) => {
  try {
    const userId = req.query.userId;

    const text = `
        SELECT *
        from Chat as c WHERE c.firstUserId = $1 OR c.secondUserId = $1
        `;

    const values = [userId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});

// Create new message
app.post("/api/chat/message/create", (req, res, next) => {
  try {
    const chatId = req.body.chatId;
    const userId = req.body.userId;
    const text = req.body.text;
    const timeStamp = new Date();

    const query = `
        INSERT INTO Message (chatId, userId, text, timeStamp)
        VALUES ($1, $2, $3, $4);
        `;

    const values = [chatId, userId, text, timeStamp];

    pool.query(query, values).then((testData) => {
      res.status(200).send("You have created a message successfully!");
    });
  } catch (error) {
    return res.send(error);
  }
});

// Get messages of a chat
app.get("/api/chat/message", (req, res, next) => {
  try {
    const chatId = req.query.chatId;

    const text = `
        SELECT *
        from Message as m WHERE m.chatId = $1 
        `;

    const values = [chatId];

    pool.query(text, values).then((testData) => {
      res.status(200).send(testData.rows);
    });
  } catch (error) {
    return res.send(error);
  }
});
