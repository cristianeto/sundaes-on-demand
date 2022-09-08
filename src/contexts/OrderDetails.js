import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { pricePerItem } from '../constants/index';

const OrderDeatils = createContext();

// create custom hook
export function useOrderDeatils() {
  const context = useContext(OrderDeatils);

  if (!context) {
    throw new Error(
      'userOrderDeatils must be used within an OrderDeatilsProvider'
    );
  }

  return context;
}

export function OrderDeatilsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const [totals, setTotals] = useState({
    scoops: 0,
    topping: 0,
    grandTotal: 0,
  });

  function calculateSubtotal(orderType, optionCounts) {
    let optionCount = 0;
    for (const count of optionCounts[orderType].values()) {
      optionCount += count;
    }
    return optionCount * pricePerItem[orderType];
  }

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal: grandTotal,
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    }
    //getter: object containing options counts for scoops and toppings, subtotal
    //setter: update option counts
    return [
      {
        ...optionCounts,
        totals,
      },
      updateItemCount,
    ];
  }, [optionCounts, totals]);

  return <OrderDeatils.Provider value={value} {...props} />;
}
