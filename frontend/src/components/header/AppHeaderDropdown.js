import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CButton
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item" >
            {/* <CButton color="primary">User</CButton> */}
            <CDropdownToggle color="primary" variant="btn-group" type = 'button'>
              Admin
        {/* <CAvatar src={avatar8} size="md" /> */}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
      {/* <CDropdownToggle color="primary">User</CDropdownToggle> */}

        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader> */}
        <CDropdownItem href="/admin/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>        
        <CDropdownItem href="/">
          <CIcon icon={cilLockLocked} className="me-2" />
          LogOut
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
