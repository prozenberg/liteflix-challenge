import { useState, useEffect } from 'react';

const useHeaderHeight = (ref) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const computedStyle = window.getComputedStyle(ref.current);
      const marginTop = parseInt(computedStyle.marginTop, 10);
      const marginBottom = parseInt(computedStyle.marginBottom, 10);
      const totalHeight =
        ref.current.getBoundingClientRect().height + marginTop + marginBottom;
      setHeight(totalHeight);
    }
  }, [ref]);

  return height;
};

export default useHeaderHeight;
