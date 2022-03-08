import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MessageEntity } from '../../../BLL/entity/MessageEntity';
import { currentUser } from '../../../BLL/CurrentUserProps';
import { MessageStyles } from '../../../Styles/MessageStyles';
import MessageInfoView from './MessageInfoView';
import { MessageStatus } from '../../../Types/enums';

type IProps = {
  messageEntityProps: MessageEntity;
};

type IState = {};

const PlainMessageView = (props: IProps) => {
  const [getState, setState] = useState<IState>({
  
  })
  const owner = props.messageEntityProps.sender === currentUser.currentUserId;

  return (
    <View style={[MessageStyles.messageContainer, owner ? MessageStyles.myMessageContainer : MessageStyles.userMessageContainer]}>
      <View style={[owner ? MessageStyles.myMessageBody : MessageStyles.userMessageBody]}>
        {!owner && (
          <TouchableOpacity activeOpacity={0.9}>
            <Text style={MessageStyles.ownerMessage}>{props.messageEntityProps.sender}</Text>
          </TouchableOpacity>
        )}
        <View>
          <Text selectable={true} style={MessageStyles.messageText}>{props.messageEntityProps.plain_message}</Text>
        </View>
        <View>
          <MessageInfoView
            currentDate={props.messageEntityProps.created_at || Date.now()}
            currentStatus={props.messageEntityProps.status}
            sender={props.messageEntityProps.sender}
          />
        </View>
      </View>
    </View>
  );
};

export default PlainMessageView;
