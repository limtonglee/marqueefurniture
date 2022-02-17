import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

function Sidebar() {
    return (
      <>
        <Navigation
            activeItemId="/order"
            onSelect={({itemId}) => {

            }}
            items={[
              {
                title: 'Order',
                itemId: '/order',
                // you can use your own custom Icon component as well
                // icon is optional
              },
              {
                title: 'Listings',
                itemId: '/listings',

                subNav: [
                  {
                    title: 'My Listings',
                    itemId: '/listings/mylistings',
                  },
                  {
                    title: 'Add New Listing',
                    itemId: '/listings/addNewListing',
                  },
                ],
              },
              {
                title: 'Voucher',
                itemId: '/voucher',
              },
              {
                title: 'Shop',
                itemId: '/shop',

                subNav: [
                    {
                      title: 'Shop Rating',
                      itemId: '/shop/rating',
                    },
                    {
                      title: 'Shop Profile',
                      itemId: '/shop/profile',
                    },
                    {
                        title: 'Shop Categories',
                        itemId: '/shop/categories',
                    },
                  ],
              },
              {
                title: 'Finance',
                itemId: '/finance',

                subNav: [
                    {
                      title: 'Income Overview',
                      itemId: '/finance/income',
                    },
                    {
                      title: 'Balance Overview',
                      itemId: '/finance/balance',
                    },
                  ],
              },
            ]}
          />
      </>
    );
}

export default Sidebar;