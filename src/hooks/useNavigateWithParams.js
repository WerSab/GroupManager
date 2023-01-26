import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

export const useNavigateWithParams = routeParam => {
  const navigation = useNavigation();
  const route = routeParam ?? useRoute();

  const navigateWithPrevParams = useCallback(
    (toScreenName, params, excludedParams) => {
      const resultParams = {
        ...route.params,
        ...params,
      };
      excludedParams?.forEach(elementKey => delete resultParams[elementKey]);
      navigation.navigate(toScreenName, resultParams);
    },
    [navigation, route],
  );

  return {navigateWithPrevParams};
};
