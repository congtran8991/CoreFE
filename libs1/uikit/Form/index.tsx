import React, { memo, useCallback, useRef } from "react";
import { KFormProps } from "./helpers";

const KForm = (props: KFormProps) => {
  const { onSubmit, ...rest } = props;

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmitWrapper: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (formRef.current?.hasAttribute("data-submitting")) {
        return;
      }

      formRef.current?.setAttribute("data-submitting", "");

      onSubmit?.(e);

      formRef.current?.removeAttribute("data-submitting");
    },
    [onSubmit]
  );

  return <form ref={formRef} noValidate {...rest} onSubmit={onSubmitWrapper} />;
};

export default memo(KForm);
