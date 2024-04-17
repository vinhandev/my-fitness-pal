export function handleStepButtonState(
    currentStepIndex: number,
    numberOfSteps: number
  ): {
    isCanSubmit: boolean;
    isCanBack: boolean;
  } {
    const minIndex = 0;
    const maxIndex = numberOfSteps - 1;

    switch (currentStepIndex) {
      case minIndex:
        return {
          isCanSubmit: false,
          isCanBack: false,
        };
      case maxIndex:
        return {
          isCanBack: true,
          isCanSubmit: true,
        };
      default:
        return {
          isCanBack: true,
          isCanSubmit: false,
        };
    }
  }