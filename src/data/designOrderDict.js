export const DesignOrderDict = {
  Nothing: {
    user: {
      action: "Request for consultation",
      statusbarTitleText: "",
      statusbarSubText: "",
    },
    designer: {
      action: "",
      statusbarTitleText: "",
      statusbarSubText: "",
    },
  },
  Requested: {
    user: {
      action: "",
      statusbarTitleText: "Consultation request has been submitted",
      statusbarSubText: "Pending designer's acceptance",
    },
    designer: {
      action: "Issue quotation",
      statusbarTitleText: "Customer has submitted consultation request",
      statusbarSubText: "Pending your acceptance",
    },
  },
  ConsultQuoted: {
    user: {
      action: "Review and pay",
      statusbarTitleText: "Quotation has been issued",
      statusbarSubText: "Pending your payment",
    },
    designer: {
      action: "Edit quotation",
      statusbarTitleText: "Quotation has been issued",
      statusbarSubText: "Pending customer payment",
    },
  },
  Paid: {
    user: {
      action: "",
      statusbarTitleText: "Consultation confirmed",
      statusbarSubText: "Have a fruitful consultation!",
    },
    designer: {
      action: "Issue quotation for design package",
      statusbarTitleText: "Consultation confirmed",
      statusbarSubText: "Have a fruitful consultation!",
    },
  },
  PackageQuoted: {
    user: {
      action: "Review and pay",
      statusbarTitleText: "Seller has issued quotation for design package",
      statusbarSubText: "Pending your payment",
    },
    designer: {
      action: "Edit quotation",
      statusbarTitleText: "Quotation for design package issued",
      statusbarSubText: "Pending customer payment",
    },
  },
  Designing: {
    user: {
      action: "",
      statusbarTitleText: "Design package confirmed",
      statusbarSubText: "Pending designer's design",
    },
    designer: {
      action: "Add design package",
      statusbarTitleText: "Design package confirmed",
      statusbarSubText: "Pending your design",
    },
  },
  InReview: {
    user: {
      action: "Review design",
      statusbarTitleText: "New design submmited",
      statusbarSubText: "Pending your review",
    },
    designer: {
      action: "",
      statusbarTitleText: "Design submitted",
      statusbarSubText: "Pending customer review",
    },
  },
  Rejected: {
    user: {
      action: "",
      statusbarTitleText: "Review submitted",
      statusbarSubText: "Pending next design from designer",
    },
    designer: {
      action: "Add design package",
      statusbarTitleText: "Design rejected",
      statusbarSubText: "Pending your design edits",
    },
  },
  Completed: {
    user: {
      action: "",
      statusbarTitleText: "Design engagement completed",
      statusbarSubText: "Congratulations",
    },
    designer: {
      action: "",
      statusbarTitleText: "Design engagement completed",
      statusbarSubText: "Congratulations",
    },
  },
};
