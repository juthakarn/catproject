import React from 'react'
import { TouchableHighlight } from 'react-native'
import {connect} from 'react-redux'
import { compose, withHandlers, withState } from 'recompose'
import styled from 'styled-components/native'
import { Colors } from '../style/styles'
import {uploadFindCat} from '../actions'
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

const AddcatScreen = ({navigation,isUploadcat, uploadPicture, pictureState = false , onChange, onSubmit}) => (
  <ScrollView>
    <Wrapper>
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
            onChangeText={(text) => onChange(text, 'address')}
            placeholder="address"
          />
        </Div>
        <Div>
          <Label>Contact</Label>
          <Input
            onChangeText={(text) => onChange(text, 'contact')}
            placeholder="contact"
          />
        </Div>
        <Div>
          <Label>Message</Label>
          <Input
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => onChange(text, 'message')}
            placeholder="Message"
          />
        </Div>
      </Div>
      <Button title="Submit" onPress={onSubmit}></Button>
    </Wrapper >
  </ScrollView>
)
const mapDispatchToProps = dispatch =>({
  uploadFile:(data)=> dispatch(uploadFindCat(data))
})
const mapStateToProps = ({findingcat}) =>{
  const { isUploadcat=true } = findingcat
  return {
    isUploadcat
  }
}
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  withState('payload','setPayload',{}),
  withState('location','setlocation',{}),
  withState('pictureState', 'setPicture', false),
  withHandlers({
    uploadPicture: ({
      setlocation,
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
          console.log(response)
          const source = response;
          setPicture(source)
        }
      });
      navigator.geolocation.getCurrentPosition( position => {
        const { coords } =  position;
        
        setlocation(coords)
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
      // Center the map on the location we just fetched.
    },
    onChange:({payload,setPayload})=>(text,name)=>{
      setPayload({...payload, [name]:text})
    },
    onSubmit:({location,uploadFile,payload,pictureState,navigation})=>(props)=>{
      const data = {
        payload,
        pictureState,
        location,
      }
      uploadFile(data)
      navigation.goBack()
    },
  })
)(AddcatScreen)
