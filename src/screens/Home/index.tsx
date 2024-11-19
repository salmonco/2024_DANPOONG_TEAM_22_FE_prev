import { View, TouchableOpacity, ImageBackground } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Txt from '../../components/atom/Txt'
import BG from '../../components/atom/BG'
import { HomeStackParamList } from '../../types/HomeStackParamList'
import Main1 from '../../../assets/svgs/main1.svg'
import Main2 from '../../../assets/svgs/main2.svg'
import Main3 from '../../../assets/svgs/main3.svg'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <BG type="main">
        {/* 배경 이미지 */}
        <ImageBackground
        source={require('../../../assets/pngs/mainBG.png')}
        style={{ position: 'absolute', bottom: 0, width: '100%', height: 762}}
      />      
      {/* 전체 frame */}
      <View className="flex-1 px-[30] pt-[117]">
        
      {/* header */}
        <View className="w-full mb-[46]">
          <Txt type="title3" content="바람돌이님, 반가워요!" color="gray_300" />
          <View className="flex flex-row">
            <Txt type="title2" content="1000명의 나그네" color="primary" />
            <Txt type="title2" content="가" color="white" />
          </View>
          <Txt
            type="title2"
            content={`당신의 목소리를 기다리고 있어요`}
            color="white"
          />
        </View>
        {/* button section*/}
        <View className="w-full h-[207] flex-row justify-between">
            <SelectBtn type='일상'/>
            <SelectBtn type='위로'/>
        </View>
      </View>
    </BG>
  )
}
export default HomeScreen;

const SelectBtn = ({type}:{type:'일상'|'위로'})=>{
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>()
  return(
    <TouchableOpacity 
    onPress={()=>{navigation.navigate('RCDList',{type})}}
    className='w-[168] px-[25] py-[18] bg-backgroundS border border-white/10 justify-between'
    style={{borderRadius:10}}>
      <View>
      {type==='일상'?
      <View className='w-[55] h-[55] justify-center items-center'><Main1/></View>:<Main2/>}
        <Txt type='title3' content={`${type} 녹음`} color='white'/>
        </View>
        <View className='flex flex-row w-full justify-between items-center'>
        <Txt type='button' content='녹음하기' color='primary'/>
        <Main3/>
        </View>
    </TouchableOpacity>
  )
}