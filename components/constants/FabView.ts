import { useState, useRef, useCallback } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, LayoutAnimation } from 'react-native';

const useHandleScroll = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollOffset = useRef(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const CustomLayoutLinear = {
        duration: 100,
        create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
        update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
        delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      };
      const isBottomBounce =
      event.nativeEvent.layoutMeasurement.height -
        event.nativeEvent.contentSize.height +
        event.nativeEvent.contentOffset.y >=
      0;
      // Check if the user is scrolling up or down by confronting the new scroll position with your own one
      const currentOffset = event.nativeEvent.contentOffset.y;
      //const direction = currentOffset > 0 && currentOffset > scrollOffset.current ? 'up' : 'down';
      const direction=currentOffset>320?true:false
      // If the user is scrolling down (and the action-button is still visible) hide it
      //const isActionButtonVisible = direction === 'up';
      if (direction !== showButton) {
        LayoutAnimation.configureNext(CustomLayoutLinear);
        setShowButton(direction);
      }
      // Update your scroll position
      scrollOffset.current = currentOffset;
    },
    [showButton]
  );

  return { handleScroll, showButton };
};

export default useHandleScroll;