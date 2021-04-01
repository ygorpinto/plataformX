import Container from "../components/Container/Container";
import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import GlobalStyles from "../styles/global";

export default function Home() {
  return (
  <>
    <GlobalStyles />
      <Container>
        <Header/>
        <Main/>
      </Container>
  </>
  )
}
