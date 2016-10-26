# Meteor Lueminut

### simple-todos

Yksinkertainen harjoitus, jossa harjoittelin Meteorin perusteita. Seurasin seuraavia ohjeita: https://www.meteor.com/tutorials/react/creating-an-app

## MyDapp

Ensimmäinen harjoitukseni hyödyntää Ethereum-yhteisön luomaa Meteor-sovellusta. Perustuu tähän: https://github.com/ethereum/wiki/wiki/Dapp-using-Meteor

### Meteor-sovelluksen käynnistys muistio

geth --dev --rpc --rpccorsdomain "http://localhost:3000"

MyDapp-ohjeissa kehotettiin ilman --dev -lippua. Jos laitan dev- lipun mukaan, saan tämän Meteor-sovelluksen käyttöön testiverkkooni.

Kun käynnistät Meteor-palvelimen, mene selaimella sinne ja kirjoita konsoliin:

> web3.eth.accounts

Vastaukseksi konsoli tulostaa kaikki Ethereumissa olevat tilinumerosi:

['0x5DCF765d1e2AcBad891Fd6143149D051EB300038', '0x7F42eC997E1b81A0a09FED2Cc7dD20af2a0041Cd']

Jos onnistut tässä, tiedät että olet onnistuneesti implementoimaan Meteor Dapp:n.

Ekakerran kun kokeilin, tuli virheilmoitus. Web3:a ei kuulemma löytynyt. Virhe saattoi johtua siitä, että unohdin tallentaa init.js-skriptin, jossa web3 olio luodaan. Noloa -_-