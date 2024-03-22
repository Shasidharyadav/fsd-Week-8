import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Committee
const AddCommittee = React.lazy(() => import('./views/pages/committee/Add'))
const AllCommittee = React.lazy(() => import('./views/pages/committee/All'))
const DetailsCommittee = React.lazy(() => import('./views/pages/committee/Details'))

// Members
const AddMember = React.lazy(() => import('./views/pages/member/Add'))
const AllMember = React.lazy(() => import('./views/pages/member/All'))
const ViewDetails = React.lazy(() => import('./views/pages/member/Details'))
const EditCommittee = React.lazy(() => import('./views/pages/member/Edit'))

// Event
const CreateEvent = React.lazy(() => import('./views/pages/event/Create'))
const AllEvents = React.lazy(() => import('./views/pages/event/All.js'))

// Social Media
const SocialMedia = React.lazy(() => import('./views/pages/socialmedia/Social'))

//Transaction
const Transactions = React.lazy(() => import('./views/pages/transactions/All'))
const TransactionDetails = React.lazy(() => import('./views/pages/transactions/Details'))
const Profile = React.lazy(() => import('./views/pages/profile/Profile'))

// Menu
const AddMenu = React.lazy(() => import('./views/pages/menu/Add'))
const AllMenu = React.lazy(() => import('./views/pages/menu/All'))

//Task
const AssignTask = React.lazy(() => import('./views/pages/task/Assign'))
const AllTasks = React.lazy(() => import('./views/pages/task/All'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },

  //Committee
  
  { path: '/admin/add-committee', exact: true,  name: 'Add Committee', element:  AddCommittee },
  { path: '/admin/all-committees', exact: true,  name: 'All Committees', element:  AllCommittee },
  { path: '/admin/committee/:committee_id', exact: true,  name: 'Edit Committee', element:  DetailsCommittee },

  //Member
  { path: '/admin/all-members', exact: true,  name: 'All Members', element:  AllMember },
  { path: '/admin/details/:member_id', exact: true,  name: 'Member Details', element:  ViewDetails },
  { path: '/admin/edit/:member_id/:committee_id', exact: true,  name: 'Edit Committee', element:  EditCommittee },

  // event 
  { path: '/admin/create-event', exact: true,  name: 'Create Event', element:  CreateEvent },
  { path: '/admin/all-events', exact: true,  name: 'All Events', element:  AllEvents },

  //Social Media
  { path: '/admin/facebook-share', exact: true,  name: 'Social Media', element:  SocialMedia },

  // Transactions
  { path: '/admin/transactions', exact: true,  name: 'Transactions', element:  Transactions },
  { path: '/admin/payment/:transaction_id', exact: true,  name: 'Transaction Details', element:  TransactionDetails },

  //user profile
  { path: '/admin/profile', exact: true,  name: 'Profile', element: Profile },


// menu
{ path: '/admin/add-menu', exact: true, name: 'Add Menu', element: AddMenu },
{ path: '/admin/all-menu', exact: true, name: 'All Menu', element: AllMenu },

// Task
{ path: '/admin/assign-task', exact: true, name: 'Assign Task', element: AssignTask },
{ path: '/admin/all-tasks', exact: true,  name: 'All Tasks', element:  AllTasks },

]

export default routes;
