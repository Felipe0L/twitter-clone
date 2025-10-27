import { MButton } from "../MenuButton/styles"
import BlackButton from "../BlackButton"

import HomeIcon from "../../assets/xmenu_home.png"
import ExploreIcon from "../../assets/xmenu_search.png"
import NotificationIcon from "../../assets/xmenu_notification.png"
import MessagesIcon from "../../assets/xmenu_message.png"
import GrokIcon from "../../assets/xmenu_grok.png"
import CommunitiesIcon from "../../assets/xmenu_communities.png"
import PremiumIcon from "../../assets/xmenu_premium.png"
import ProfileIcon from "../../assets/xmenu_profile.png"
import MoreIcon from "../../assets/xmenu_more.png"

const MenuBar = () => (
  <>
    <ul>
      <li>
        <MButton>
          <img src={HomeIcon} /> Inicio
        </MButton>
      </li>
      <li>
        <MButton>
          <img src={ExploreIcon} /> Explore
        </MButton>
      </li>
      <li>
        <MButton>
          <img src={NotificationIcon} />
          Notificação
        </MButton>
      </li>
      <li>
        <MButton>
          <img src={MessagesIcon} /> Mensagens
        </MButton>
      </li>
      <li>
        <MButton>
          <img src={GrokIcon} /> Grok
        </MButton>
      </li>
      <li>
        <MButton>
          <img src={CommunitiesIcon} /> Comunidades
        </MButton>
      </li>
      <li>
        <MButton>
          <img src={PremiumIcon} /> Premium
        </MButton>
      </li>
      <li>
        <MButton>
          <img src={ProfileIcon} /> Perfil
        </MButton>
      </li>
      <li>
        <MButton>
          <img src={MoreIcon} /> Mais
        </MButton>
      </li>
    </ul>
    <div>
      <BlackButton>Post</BlackButton>
    </div>
  </>
)

export default MenuBar
