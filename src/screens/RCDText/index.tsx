import { TextInput, TouchableOpacity, View } from 'react-native'
import BG from '@components/atom/BG'
import StarPNG from '@components/atom/StarPNG'
import Txt from '@components/atom/Txt'
import Button from '@components/atom/button/Button'
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import ShadowView from '@components/atom/ShadowView'
import { useState, useRef, useEffect } from 'react'
import { HomeStackParamList } from '../../types/HomeStackParamList'
import { ScrollView } from 'react-native-gesture-handler'
import { postSaveScript } from '@apis/RCDApis/postSaveScript'
const RCDTextScreen = ({route}: {route: RouteProp<HomeStackParamList, 'RCDText'>}) => {
  const {item,gptRes,alarmId} = route.params
  const [text, setText] = useState('')
  const textInputRef = useRef<TextInput>(null);
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>()

  useEffect(()=>{setText(gptRes?.result.content||'')},[])

  const onChangeText = (text:string) => {
    setText(text)
  }

const scriptSubmitHandler = async () => {
  try {
    const content: string = text;
    const res = await postSaveScript(alarmId, content);
    const voiceFileId = res.result.voiceFileId
    navigation.navigate('RCDRecord', { item, gptRes, alarmId,voiceFileId,content });
  } catch (e) {
    console.log('스크립트 저장 오류:', e);
    }
  };  

  return (
    <BG type="solid">
      {/* frame */}
      <ScrollView className="w-full h-full px-px pt-[52]" contentContainerStyle={{alignItems: 'center'}}>
        {/* image section*/}
       
          <StarPNG />
        <View className='mb-[29]'/>
        {/* header section*/}
        <View
          className="w-[250] h-auto items-center mb-[50]">
          <Txt
            content={item.title}
            color="white"
            type="title2"
            align="center"
          />
        </View>
        {/* text input section*/}
          <View className='flex-1 w-full h-[340] mb-[51]'>
        <ShadowView>
        <TextInput
          ref={textInputRef}
          onChangeText={onChangeText}
          value={text}
          className="w-full h-auto p-[33] text-white font-r text-[20] leading-[30]"
          placeholder="15초 동안 녹음할 말을 작성해주세요"
          placeholderTextColor='#a0a0a0'
          autoCapitalize="none"
          // caretHidden={true}
          cursorColor='#fafafa'
          multiline
          textAlign='left'
          // maxLength={30}
          onFocus={()=>{}}
        />
        <TouchableOpacity
          onPress={() => {
            if (textInputRef.current) {
              textInputRef.current.focus();
            }
          }}
          className='flex-1'
        />
        </ShadowView>
        </View>
        {/* button section*/}
        <View className='w-full mb-[78]'>
        <Button
          text="녹음하기"
          onPress={scriptSubmitHandler}
          disabled={text.length===0}
        />
        </View>
      </ScrollView>
    </BG>
  )
}
export default RCDTextScreen
