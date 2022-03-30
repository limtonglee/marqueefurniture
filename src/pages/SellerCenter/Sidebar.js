import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Navigation
        activeItemId={location.pathname}
        onSelect={({ itemId }) => {
          navigate(itemId)
        }}
        items={[
          {
            title: 'Orders',
            itemId: '/sellercenter/orders',
            elemBefore: () => <AssignmentIcon />,
          },
          {
            title: 'Listings',
            itemId: '/sellercenter/listings',
            elemBefore: () => <ShoppingBagIcon />,
            subNav: [
              {
                title: 'My Listings',
                itemId: '/sellercenter/listings/myListings',
              },
              {
                title: 'Add New Listing',
                itemId: '/sellercenter/listings/addNewListing',
              },
            ],
          },
          {
            title: 'Voucher',
            itemId: '/sellercenter/voucher',
            elemBefore: () => <LocalOfferIcon />,
          },
          {
            title: 'Shop',
            itemId: '/sellercenter/shop',
            elemBefore: () => <StoreIcon />,
            subNav: [
              {
                title: 'Shop Profile',
                itemId: '/sellercenter/shop/profile',
              },
              {
                title: 'Shop Rating',
                itemId: '/sellercenter/shop/rating',
              },
              {
                title: 'Shop Categories',
                itemId: '/sellercenter/shop/categories',
              },
            ],
          },
          {
            title: 'Finance',
            itemId: '/sellercenter/finance/income',
            elemBefore: () => <AccountBalanceWalletIcon />,
          },
        ]}
      />
    </>
  );
}

export default Sidebar;


