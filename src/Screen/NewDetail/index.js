import React, { Component } from 'react';
import  {connect}  from 'react-redux'
import { Image } from 'react-native-elements';
import HTML from 'react-native-render-html';
import { Text, View, Button, Dimensions, ScrollView} from 'react-native';
class Setting extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerTitle: 'TEST',
  });
  state={
    contentSelected:{}
  }
  componentDidMount(){
    const {navigation,news} = this.props
    const {state:{params:{itemId}}} = navigation 
    const {list} = news
    const contentSelected = list.find(({id})=>id===itemId)
   this.setState({
    contentSelected
   },()=>console.log(this.state))

  }
  render() {
    const {contentSelected = {}} = this.state
    return (
      <ScrollView >
      <Image
        source={{ uri: contentSelected.image }}
        style={{ width: '100%', height:200}}
      />
      <View style={{ flex: 1, padding:20, justifyContent: "center", alignItems: "center" }}>
        <HTML html={contentSelected.content||``} imagesMaxWidth={Dimensions.get('window').width}/>
      </View>
      </ScrollView>
    )
  }
}
const mapStateToProps = ({news})=>({
  news:news
})
export default connect(mapStateToProps,null)(Setting)