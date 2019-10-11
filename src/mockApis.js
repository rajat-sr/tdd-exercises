const counter = { initial: 10 };

const fetchCounterValue = () => {
  return new Promise(resolve => setTimeout(resolve, 500)).then(() => {
    return {
      status: 200,
      data: counter,
    };
  });
};

export default {
  fetchCounterValue,
};
