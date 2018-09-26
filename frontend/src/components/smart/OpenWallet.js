import React, { Component } from 'react'

class OpenWallet extends Component {
  constructor(props) {
    super(props)
  }
  
  async decryptWallet() {
    const jsonWallet = sessionStorage.getItem('jsonWallet')
    const decryptedWallet = await EtheriumClient.decryptWallet(jsonWallet, 'pass')
    const balance = await EtheriumClient.getBalance(decryptedWallet.address)
    console.log(balance, 'BALANCE')
    console.log(decryptedWallet, 'decrypted wallet')
  }

  uploadJSONWallet(event) {
    const files = event.target.files
    const reader = new FileReader()

    if (files.length) {
      reader.readAsText(files[0])
    }
    reader.onload = function () {
      console.log(reader.result)
      sessionStorage.setItem('jsonWallet', reader.result)
    }
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default OpenWallet
