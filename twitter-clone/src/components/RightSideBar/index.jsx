import {
  SubscribeContainer,
  TrendContainer,
  TrendItem,
  Trendspan
} from "./styles"

import Title from "../Title"
import ButtonLink from "../ButtonLink"

const RightSideBar = () => (
  <>
    <SubscribeContainer>
      <Title font={20}>Assine o premium</Title>
      <span>Se inscreva para desbloquear novos recursos.</span>
      <ButtonLink principal>Inscreva-se</ButtonLink>
    </SubscribeContainer>
    <TrendContainer>
      <Title font={20}>O que está acontecendo agora?</Title>
      <ul>
        <TrendItem>
          <Trendspan>Trending no Brasil</Trendspan>
          <Trendspan principal>Dubai</Trendspan>
          <Trendspan>42.4k posts</Trendspan>
        </TrendItem>
        <TrendItem>
          <Trendspan>Trending no Brasil</Trendspan>
          <Trendspan principal>Cachorro caramelo</Trendspan>
          <Trendspan>33.5k posts</Trendspan>
        </TrendItem>
        <TrendItem>
          <Trendspan>Trending no Brasil</Trendspan>
          <Trendspan principal>Futebol</Trendspan>
          <Trendspan>63.2k posts</Trendspan>
        </TrendItem>
      </ul>
    </TrendContainer>
  </>
)

export default RightSideBar
