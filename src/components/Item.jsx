import React from 'react';
import firebase from '../firebase';

const Item = ({ index, stock, getStocksFromFirestore }) => {
  // timestamp形式のデータをいい感じの形式に変換する関数
  const convertFromTimestampToDatetime = (timestamp) => {
    const _d = timestamp ? new Date(timestamp * 1000) : new Date();
    const Y = _d.getFullYear();
    const m = (_d.getMonth() + 1).toString().padStart(2, '0');
    const d = _d.getDate().toString().padStart(2, '0');
    return `${Y}/${m}/${d}`;
  };

  // ドキュメントIDを指定してFirestoreのデータを更新する関数
  const updateDataOnFirestore = async (
    collectionName,
    documentId,
    stockName,
    dividendAmount,
    dateOfDividend
  ) => {
    const updateData = await firebase
      .firestore()
      .collection(collectionName)
      .doc(documentId)
      .update({
        stockName: stockName,
        dividendAmount: dividendAmount,
        dateOfDividend: dateOfDividend,
      });
    getStocksFromFirestore();
    return;
  };

  // ドキュメントIDを指定してFirestoreのデータを削除する関数
  const deleteDataOnFirestore = async (collectionName, documentId) => {
    const removeData = await firebase
      .firestore()
      .collection(collectionName)
      .doc(documentId)
      .delete();
    getStocksFromFirestore();
    return;
  };

  return (
    <li key={index} id={stock.id}>
      <p>銘柄名：{stock.data.stockName}</p>
      <p>配当金額：{stock.data.dividendAmount}</p>
      <p>
        配当受領日：
        {convertFromTimestampToDatetime(stock.data.dateOfDividend.seconds)}
      </p>
      <button
        value={stock.id}
        onClick={(e) => deleteDataOnFirestore('stocks', stock.id)}
      >
        削除する
      </button>
    </li>
  );
};
export default Item;
