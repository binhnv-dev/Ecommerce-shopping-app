import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../../Common/Button';

interface SubPageProps {
  title: string;
  actionTitle?: string;
  handleAction?: () => void;
  children: React.ReactNode;
}

const SubPage: React.FC<SubPageProps> = ({ title, actionTitle, handleAction, children }) => {
  return (
    <View style={styles.subPage}>
      <View style={styles.subPageHeader}>
        <Text style={styles.title}>{title}</Text>
        {actionTitle && (
          <TouchableOpacity style={styles.action} onPress={handleAction}>
            <Button variant="none" size="sm" text={actionTitle} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.subPageBody}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  subPage: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  subPageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  action: {
    // Add any styles you need for the action button container
  },
  subPageBody: {
    flex: 1,
  },
});

export default SubPage;