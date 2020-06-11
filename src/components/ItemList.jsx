// ItemList.jsx
import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import InputForm from './InputForm';
import Item from './Item';

const ItemList = (props) => {
  const [stockList, setstockList] = useState(null);

  // firestoreから全データを取得してstateに格納する関数
  const getStocksFromFirestore = async () => {
    const itemListArray = await firebase
      .firestore()
      .collection('stocks')
      .orderBy('dateOfDividend')
      .get();
    const stockArray = itemListArray.docs.map((x) => {
      return {
        id: x.id,
        data: x.data(),
      };
    });
    setstockList(stockArray);
    return stockArray;
  };

  // useEffectを利用してFirestoreからデータの一覧を取得．
  useEffect(() => {
    const result = getStocksFromFirestore();
  }, [props]);

  return (
    <div>
      <InputForm getStocksFromFirestore={getStocksFromFirestore} />
      <p>
        合計配当金額：
        {stockList
          ?.map((x) => {
            return Number(x.data.dividendAmount);
          })
          .reduce((a, b) => {
            return a + b;
          })}
      </p>
      <ul>
        {stockList?.map((x, index) => (
          <Item
            key={index}
            stock={x}
            index={index}
            getStocksFromFirestore={getStocksFromFirestore}
          />
        ))}
      </ul>
    </div>
  );
};
export default ItemList;
