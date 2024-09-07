import { Text, View } from 'react-native';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';

export default function IndexScreen() {
  return (

    <View >
      <Text >Team Mates</Text>
      <SignedIn>
        <Text>Signed In to Team Mates</Text>
      </SignedIn>
      <SignedOut>
        <Text>Signed Out to Team Mates</Text>
      </SignedOut>
    </View>

  );
}


