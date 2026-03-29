import { RefObject, useEffect, useRef } from "react";

const useCombineRefs = <T>(...refs: any[]): RefObject<T> => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }
      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef as RefObject<T>;
};

export default useCombineRefs;
