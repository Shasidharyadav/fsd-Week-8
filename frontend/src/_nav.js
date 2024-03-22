import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilAddressBook,
  cilAlignCenter,
  cilListNumbered,
  cilPlus,
  cilGroup,
  cilList,
  cibTwitter,
  cilMoney
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

  },
 
  {
    component: CNavGroup,
    name: 'Committee',
    // to: '/base',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add New Committee',
        to: '/admin/add-committee',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,

        
      },
      {
        component: CNavItem,
        name: 'All Committees',
        to: '/admin/all-committees',
        icon: <CIcon icon={cilListNumbered} customClassName="nav-icon" />

      },
    ],
  },

  
  {
    component: CNavGroup,
    name: 'Members',
    // to: '/base',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
    items: [

      {
        component: CNavItem,
        name: 'All Members',
        to: '/admin/all-members',
        icon: <CIcon icon={cilListNumbered} customClassName="nav-icon" />
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Event',
    // to: '/base',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [

      {
        component: CNavItem,
        name: 'Create Event',
        to: '/admin/create-event',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,

      },
      {
        component: CNavItem,
        name: 'All Events',
        to: '/admin/all-events',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,

      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Menu',
    // to: '/base',
    icon: <CIcon icon={cilAlignCenter} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Menu',
        to: '/admin/add-menu',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,

      },
      {
        component: CNavItem,
        name: 'All Menus',
        to: '/admin/all-menu',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,

      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Task',
    // to: '/base',
    icon: <CIcon icon={cilAlignCenter} customClassName="nav-icon" />,
    items: [

      {
        component: CNavItem,
        name: 'Assign Task',
        to: '/admin/assign-task',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,

      },
      {
        component: CNavItem,
        name: 'All Tasks',
        to: '/admin/all-tasks',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,

      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Social Media',
  //   to: '/admin/facebook-share',
  //   icon: <CIcon icon={cibTwitter} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Facebook',
  //       to: '/admin/facebook-share',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Create Post',
  //       to: '/admin/create-event',
  //     },
  //   ],
  // },

  {
    component: CNavGroup,
    name: 'Payment Info',
    // to: '/base',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
 
      {
        component: CNavItem,
        name: 'All Transactions',
        to: '/admin/transactions',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,

      },
    ],
  },
  {
    component: CNavItem,
    name: 'Social Media',
    to: '/admin/facebook-share',
    icon: <CIcon icon={cibTwitter} customClassName="nav-icon" />,

  },
  
]

export default _nav
