import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'

export const Slogan = styled('p')`
  color: rgba(255, 255, 255, 0.5);
  min-width: 280px;
  letter-spacing: 0.02em;
  font-size: 18px;
  line-height: 30px;
  padding-top: 1rem;
  display: flex;
  align-items: baseline;
`

export const Navbar = styled(AppBar)`
  background-color: transparent;
`
