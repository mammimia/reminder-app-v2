import { Ionicons } from '@expo/vector-icons';
import { TColors, useStyles } from '@mammimia/ui';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar } from 'react-native-paper';

type IoniconsName = keyof typeof Ionicons.glyphMap;

type Props = {
  mainText: string;
  subText: string;
  icon?: IoniconsName;
  handlePress?: () => void;
  bgColor?: string;
  textColor?: string;
};

const HeaderBar = ({
  mainText = 'Hi Mammimia,',
  subText,
  icon,
  handlePress,
  bgColor,
  textColor,
}: Props) => {
  const { styles, colors } = useStyles(createStyles);

  return (
    <View
      style={[styles.container, bgColor ? { backgroundColor: bgColor } : null]}
    >
      <View style={styles.avatarContainer}>
        <Avatar.Text
          style={[
            styles.avatar,
            textColor ? { backgroundColor: textColor } : null,
          ]}
          label="MA"
          size={36}
        />
        <View>
          <Text style={[styles.title, textColor ? { color: textColor } : null]}>
            {mainText}
          </Text>
          {subText && (
            <Text
              style={[styles.infoText, textColor ? { color: textColor } : null]}
            >
              {subText}
            </Text>
          )}
        </View>
      </View>
      {icon && (
        <TouchableOpacity onPress={handlePress}>
          <Ionicons name={icon} size={30} color={textColor || colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderBar;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'ios' ? 64 : 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
    },
    infoText: {
      fontSize: 14,
      color: colors.primary,
      opacity: 0.8,
    },
    avatarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    avatar: {
      backgroundColor: colors.primary,
    },
  });
