import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { fetchNews } from '../actions';

const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
]

class Detail extends Component {
  componentDidMount() {
    this.props.fetchNewsList()
  }

  render() {
    const { list = [] } = this.props.news
    if (list.length > 0) {
      return (
        <ScrollView >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {
              list.map(data => {
                const { id, title, subtitle, image } = data
                if (data) {
                  return (
                    <Card
                      key={`card-data-${id}`}
                      width={'90%'}
                      featuredTitle={title}
                      image={{ uri: image }}
                    >
                      <Text style={{ marginBottom: 10 }}>
                        {subtitle}
                      </Text>
                      <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        backgroundColor='#03A9F4'
                        onPress={() => {
                          this.props.navigation.navigate('NewDetail', {
                            itemId: data.id,
                          });
                        }}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='อ่านเพิ่มเติม' />
                    </Card>
                  )
                }
              })
            }
          </View>
        </ScrollView >
      )
    } else {
      return (
        <Text>Loading</Text>
      )
    }
  }
}
const mapDispatchToProps = dispatch => ({
  fetchNewsList: () => dispatch(fetchNews())
})
const mapStateToProps = (state) => {
  return {
    news: state.news
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)