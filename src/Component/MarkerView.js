import React from 'react'
import {Text,ScrollView,View,Image,Button} from 'react-native'
import styled from 'styled-components'
import {connect}  from 'react-redux'
import { HOST, ReceiveCat } from '../actions';
const Label = styled(Text)`
  font-size:20px;
`
class MarkerView extends React.Component{
  handleDeleteCat = (id)=>{
    const {navigation,handleDeleteCat}  = this.props
    handleDeleteCat(id)
    navigation.goBack()
  }
  render(){
   const {navigation}  = this.props
   const { state: { params: { data:{id,imagepath,address,contact,message} } } } = navigation
    return(
      <ScrollView>
       <Image
          source={{ uri: `${HOST}/${imagepath}` }}
          style={{ width: '100%', height: 300 }}
        />
        <View style={{padding:15}}>
          {/* <Text>{id}</Text>
          <Text>{imagepath}</Text> */}
          <Label>สถานที่:{address}</Label>
          <Label>ข้อมูลติดต่อ:{contact}</Label>
          <Label>ข้อมูลเพิ่มเติม:{message}</Label>
          <Button onPress={()=>this.handleDeleteCat(id)} title="รับเลี้ยงสัตว์"/>
        </View>
      </ScrollView>
    )
  }
}
const mapDispatchToProps = (dispatch)=>({
  handleDeleteCat:(id)=>dispatch(ReceiveCat(id))
})

export default connect(null,mapDispatchToProps)(MarkerView)