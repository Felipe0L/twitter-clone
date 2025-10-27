import { CadLink } from "./styles"

const ButtonLink = ({ children, principal, onClick }) => (
  <CadLink onClick={onClick} principal={principal}>
    {children}
  </CadLink>
)

export default ButtonLink
