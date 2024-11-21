import { View } from 'react-native'
import BG from '../../components/atom/BG'
import Txt from '../../components/atom/Txt'
import Carousel from '../../components/molecule/Carousel'
import { ImageBackground } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { HomeStackParamList } from '../../types/HomeStackParamList'
import { getRCDList, RCD } from '@apis/RCDApis/getRCDList'
import { useState, useEffect } from 'react'
const RCDListScreen = ({route}: {route: RouteProp<HomeStackParamList, 'RCDList'>}) => {
  const {type} = route.params
  // test data - 나중에 api 요청 받아서 데이터 넣어주기
  const entries = [
    {head:'비가 오는 날 외출하는\n청년을 위한 한 마디'}, 
    {head:'비가 오는 날 외출하는\n청년다방'},
    {head:'1'},
    {head:'2'},
    {head:'3'},
    {head:'4'}]
  const [rcdList, setRcdList] = useState<RCD[]>([])
  useEffect(() => {
    console.log(rcdList)
  }, [rcdList])
  useEffect(() => {
    let categoryType: 'DAILY' | 'COMFORT' = 'DAILY'
    if (type === '일상') {
      categoryType = 'DAILY'
    } else {
      categoryType = 'COMFORT'
    }
    try {
      getRCDList(categoryType).then(setRcdList)
    } catch (error) {
      console.error('RCD 목록을 가져오는데 실패했습니다:', error)
    }
  }, [])
  return (
    <BG type="gradation">
      {/* BG Image */}
      <ImageBackground
        source={require('../../../assets/pngs/BGStarTop.png')}
        style={{
          position: 'absolute',
          top: 32,
          right: 0,
          width: 161,
          height: 130,
        }}
      />
        <ImageBackground
          source={require('../../../assets/pngs/BGStarBottom.png')}
          style={{ position: 'absolute', bottom: 0, width: '100%', height: 258 }}
        />
      {/* content section */}
        {/* header */}
        <View className="w-full mt-[63] px-px mb-[33]">
          <Txt
            type="title2"
            content={type==='일상' ? `청년에게 일상을 응원하는\n녹음을 들려주세요` : `청년에게 위로하는\n목소리를 들려주세요`}
            color="white"
          />
          
        </View>
        {/* list */}
        <Carousel entries={entries} />
    </BG>
  )
}
export default RCDListScreen;
