import React, { useState } from 'react';
import firebase from '../firebase';

const InputForm = ({ getStocksFromFirestore }) => {
  const [stockName, setStockName] = useState('');
  const [dividendAmount, setDividendAmount] = useState('');
  const [dateOfDividend, setDateOfDividend] = useState('');

  // Firestoreにデータを送信する関数
  const postDataToFirestore = async (collectionName, postData) => {
    const addedData = await firebase
      .firestore()
      .collection(collectionName)
      .add(postData);
    return addedData;
  };

  // submitボタンクリック時の処理
  const submitData = async () => {
    if (stockName === '' || dividendAmount === '' || dateOfDividend === '') {
      return false;
    }
    const postData = {
      stockName: stockName,
      dividendAmount: dividendAmount,
      dateOfDividend: new Date(dateOfDividend),
    };
    const addedData = await postDataToFirestore('stocks', postData);
    setStockName('');
    setDividendAmount('');
    setDateOfDividend('');
    getStocksFromFirestore();
  };

  return (
    <form action="">
      <ul>
        <li>
          <label htmlFor="stockName">銘柄名：</label>
          <input
            type="text"
            id="stockName"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="dividendAmount">配当金額：</label>
          <input
            type="number"
            id="dividendAmount"
            value={dividendAmount}
            onChange={(e) => setDividendAmount(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="limit">配当受取日：</label>
          <input
            type="datetime-local"
            id="dateOfDividend"
            value={dateOfDividend}
            onChange={(e) => setDateOfDividend(e.target.value)}
          />
        </li>
        <li>
          <button type="button" onClick={submitData}>
            追加する
          </button>
        </li>
      </ul>
    </form>
  );
};

export default InputForm;
