


# Pour le login avec touch id

# 1 etape (version IOS)

$ npm install react-native-biometrics --save
$ pod install

# 2 etape


import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })
# { allowDeviceCredentials: true } permet de donner une autorisation au telephone de pouvoir mettre le code de l'appareil apres deux essais echouer



# isSensorAvailable() Détecte le type de capteur biométrique disponible. Renvoie un Promisequi se résout en un objet avec des détails sur la disponibilité de la biométrie

rnBiometrics.isSensorAvailable()
  .then((resultObject) => {
    const { available, biometryType } = resultObject

    if (available && biometryType === BiometryTypes.TouchID) {
      console.log('TouchID is supported')
    } else if (available && biometryType === BiometryTypes.FaceID) {
      console.log('FaceID is supported')
    } else if (available && biometryType === BiometryTypes.Biometrics) {
      console.log('Biometrics is supported')
    } else {
      console.log('Biometrics not supported')
    }
  })

# 3 etape

# créer une clé qui sera stockée dans le magasin de clés de l'appareil. Renvoie un Promisequi se résout en un objet fournissant des détails sur les clés. et Stocker l'identification dans le telephone  au moment ou je créer un utilisateur puis le reprendre pour se connecter si mon touch id est valide 


export const CreateUserBase = (value: FormValuesSignUp, navigation: any) => {
    auth()
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(() => {
        console.log('User account created & signed in!');
        let UID123_object = {
          name: value.email,
          password: value.password,
        };
       
           AsyncStorage.setItem( 'UID123', JSON.stringify(UID123_object)),
           console.log(value.email)
        navigation.navigate('Home', {email: value.email, password: value.password});

        rnBiometrics.createKeys()
        .then((resultObject) => {
          const { publicKey } = resultObject
          console.log(publicKey)
        })
        let UID1234_object = {
          name: value.email,
          password: value.password,
          publicKey: value.publicKey,
        };
        AsyncStorage.setItem( 'UID1234', JSON.stringify(UID1234_object)),
        console.log(value.email, value.password, value.publicKey);

      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Cette adresse email est déjà utilisée !');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('Le mail est ne correspond à aucun compte !');
        }
        if (error.code === 'auth/wrong-password') {
          console.log('Le mot de passe correspond à aucun compte !');
        }

        //console.error(error);
      });
}


# 4 etape

# qui sera stockée dans le magasin de clés de l'appareil. Renvoie un Promise qui se résout en un objet fournissant des détails sur les clés. (biometricKeysExist()) => verifie si la clé exist ou pas 



rnBiometrics.biometricKeysExist()
  .then((resultObject) => {
    const { keysExist } = resultObject

    if (keysExist) {
      console.log('Keys exist')
    } else {
      console.log('Keys do not exist or were deleted')
    }
  })


# 5 etape

# Invite l'utilisateur à entrer son empreinte digitale ou son identifiant facial afin de récupérer la clé privée puis génére une signature et renvoie un Promise qui se résout en un objet avec des détails sur la signature.


# on va get l'objet identifiant stocker au moment de créer un utilisateur puis on se connecte avec si le touch id = success

let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'
const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

const rnBiometricsSignature = () => {
  console.log('signature avant', payload);
 
  rnBiometrics.createSignature({
      promptMessage: 'Sign in',
      payload: payload
    })
    .then((resultObject) => {
      const { success, signature } = resultObject;
      console.log('signature', success, signature);
      console.log('signature', payload);

      AsyncStorage.getItem('UID1234', (err, result) => {
        console.log("Le resultat" + result);
        console.log("Le resultat" + result);
         if(result) {
          const userObject = JSON.parse(result)
          console.log("resultat" + userObject.name);
  
          auth()
          .signInWithEmailAndPassword(userObject.name, userObject.password)
          .then(() => {
            navigation.replace('Home');
          })
        } 
      });
      
 
      if (success) {
        console.log(signature)
        setIsSuccess(true);
        //verifySignatureWithServer(signature, payload)
      }
    })
    
}


# 6 etape

# `permet de tester si le biometric touch id et bon permet d'avoir accées des autorisation dans l'application par exemple ils servira a demande la permission de voir le mot de passe 

rnBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
  .then((resultObject) => {
    const { success } = resultObject

    if (success) {
      console.log('successful biometrics provided')
    } else {
      console.log('user cancelled biometric prompt')
    }
  })
  .catch(() => {
    console.log('biometrics failed')
  })



# 7 etape 

# sert a supprimer la clé de l'appareil

rnBiometrics.deleteKeys()
  .then((resultObject) => {
    const { keysDeleted } = resultObject

    if (keysDeleted) {
      console.log('Successful deletion')
    } else {
      console.log('Unsuccessful deletion because there were no keys to delete')
    }
  })