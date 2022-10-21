import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import styled from '../../style/styles';
import colors from '../../constants/colors';
import AppButton from '../../component/AppButton';
import fonts from '../../constants/fonts';
import Modal from 'react-native-modal';
import { sector } from '../../constants/location';
import { baseURL, post } from '../../utils/Api';
import ToastMessage from '../../component/ToastMessage';

function Location({ route, navigation }) {
  const { phone } = route.params;
  const [sectorModal, setSectorModal] = useState(false);
  const [selectedSector, setSelectedSector] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectLocation = () => {
    setLoading(true);
    post(`${baseURL}/location`, {
      customer_sector: selectedSector,
      customer_phone_number: `+250${phone}`,
    })
      .then((res) => {
        if (res.data.status == 200) {
          navigation.navigate('MainStack');
        } else {
          setError('An error occured! Please try again later!');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('An error occured! Please try again later!');
        setLoading(false);
      });
  };

  return (
    <AppScreen>
      {error && (
        <ToastMessage
          label={error}
          style={{
            backgroundColor: colors.danger,
          }}
          onPress={() => setError(null)}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        keyboardVerticalOffset={80}>
        <Modal isVisible={sectorModal}>
          <View style={styled.modal}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={[styled.header, { fontSize: 18 }]}>Select your Region</Text>
              <TouchableOpacity
                onPress={() => setSectorModal(false)}
                style={{
                  height: 35,
                  width: 35,
                  backgroundColor: colors.backgroundGrey,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                }}>
                <Feather name="x" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {sector.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedSector(item);
                      setSectorModal(false);
                    }}
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 45,
                      borderBottomColor: colors.backgroundGrey,
                      borderBottomWidth: 1,
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                    }}>
                    <Text style={{ fontFamily: fonts.medium, color: colors.textDark }}>{item}</Text>
                    {selectedSector == item && (
                      <Feather name="check" size={16} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Modal>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MainStack');
              }}
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  textDecorationLine: 'underline',
                  color: colors.textGrey,
                }}>
                Skip this step
              </Text>
            </TouchableOpacity>
            <View style={{ height: 20 }} />
            <Text style={styled.header}>Select your location</Text>
            <Text style={[styled.subheader, { marginBottom: 25 }]}>
              Let us know know your location to serve you better and faster.
            </Text>

            <View style={{ marginVertical: 10 }}>
              <Text style={styled.label}>Your zone</Text>
              <View style={styled.inputField}>
                <Text style={styled.subheader}>Kigali</Text>
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={styled.label}>Your area</Text>
              <TouchableOpacity onPress={() => setSectorModal(true)} style={styled.inputField}>
                <Text style={[styled.subheader, { flex: 1 }]}>
                  {selectedSector == undefined ? 'Select Area' : selectedSector}
                </Text>
                <Feather name="chevron-down" size={16} color={colors.iconDark} />
              </TouchableOpacity>
            </View>

            <AppButton
              onPress={
                selectedSector == undefined || loading ? () => {} : () => handleSelectLocation()
              }
              label="Confirm"
              style={{
                backgroundColor:
                  selectedSector == undefined || loading ? colors.textGrey : colors.primary,
              }}
              loading={loading}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

export default Location;
