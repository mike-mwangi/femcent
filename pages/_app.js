import '../styles/globals.css'
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'

// fantom chain ID - 4002
const supportedChainIds = [4, 4002]
const connectors = {
  injected: {},
}

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  )
}

export default MyApp