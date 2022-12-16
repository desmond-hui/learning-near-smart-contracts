function environment(env) {
  if (env === 'testnet') {
    return {
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      contractName: 'courses.altan.testnet',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    };
  } else {
    throw Error('Unknown environment ', env);
  }
}

export default environment;
