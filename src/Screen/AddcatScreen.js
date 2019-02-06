import React from 'react'
import { TouchableHighlight } from 'react-native'
import { compose, withHandlers, withState } from 'recompose'
import styled from 'styled-components/native'
import { Colors } from '../style/styles'
import ImagePicker from 'react-native-image-picker'

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10% 10%;
  width: 100%;
  height:  100%;
  flex: 1;
`

const Label = styled.Text`
  margin-bottom: 15px;
`
const Div = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
`
const ContainerImage = styled.View`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
`
const Input = styled.TextInput`
  width: 100%;
  height: ${props => props.multiline ? '150px' : '45px'};
  border: 1px #ffffff solid;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 15px 10px;
  margin-bottom: 15px;
`
const Picture = styled.Image`
  width: 100px;
  height: 100px;
  margin: 15%;
`
const UploadImage = styled.Image`
  width: 200px;
  height: 200px;
  margin: 15%;
  border-radius: 100;
`
const ScrollView = styled.ScrollView`
  background-color: ${Colors.BLUE_BACKGROUND};
`

const Button = styled.Button``

const AddcatScreen = ({ uploadPicture, pictureState = false }) => (
  <ScrollView>
    <Wrapper>
      {console.log('pictureState', pictureState)}
      <TouchableHighlight
        onPress={uploadPicture}
      >
        {
          pictureState ? <UploadImage source={pictureState}></UploadImage> :
            <Picture source={require('../Component/Image/camera.png')}></Picture>}
      </TouchableHighlight>
      <Div>
        <Div>
          <Label>Address</Label>
          <Input
            placeholder="address"
          />
        </Div>
        <Div>
          <Label>Contact</Label>
          <Input
            placeholder="contact"
          />
        </Div>
        <Div>
          <Label>Message</Label>
          <Input
            multiline={true}
            numberOfLines={4}
            placeholder="Message"
          />
        </Div>
      </Div>
      <Button title="Submit"></Button>
    </Wrapper >
  </ScrollView>
)
export default compose(
  withState('pictureState', 'setPicture', false),
  withHandlers({
    uploadPicture: ({
      pictureState,
      setPicture
    }) => () => {
      const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri, width: 300, height: 300 };
          setPicture(source)
        }
      });
    }
  })
)(AddcatScreen)