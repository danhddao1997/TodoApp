import {PriorityItem, StatusItem} from 'models/data';
import {Platform} from 'react-native';

export const STATUS_LIST: StatusItem[] = [
  {title: 'On-going', status: 0, color: '#42A5F5'},
  {title: 'Completed', status: 1, color: '#008000'},
  {title: 'Canceled', status: 2, color: '#ff6060'},
];

export const PRIORITY_LIST: PriorityItem[] = [
  {
    title: 'Low',
    color: '#97D799',
    priority: 0,
  },
  {
    title: 'Medium',
    color: '#FFE18B',
    priority: 1,
  },
  {
    title: 'High',
    color: '#FF6A6A',
    priority: 2,
  },
];

export const SORT_CATEGORY_TITLE_MAPPING: {[key: string]: string} = {
  title: 'Title',
  priority: 'Priority',
  createdAt: 'Create time',
  updatedAt: 'Update time',
  deadline: 'Deadline',
};

export const isIOS = Platform.OS === 'ios';
