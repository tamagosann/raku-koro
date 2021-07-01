import React from 'react';

// 型
import { Data } from '../../features/graphs/bedOccupancyRateSlice';

import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import {PieChartComponent} from '../molecules/PieChartComponent'

interface Props {
    element: Data;
    data: {
      name: string;
      value: number;
    }[];
  }

export const ModalPreview = ({ element, data }: Props) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }
  
    return (
      <div>
        <div onClick={openModal}>
          <h3>{element.prefecture}</h3>
          <p>{element.use_bed_rate}</p>
          <p>
            {element.inpatient.toLocaleString()}人 /{' '}
            {element.secure_bed.toLocaleString()}床
          </p>
        </div>
        <Modal open={modalIsOpen} onClose={closeModal}>
          <h2 style={{ textAlign: 'center' }}>
            {element.prefecture} 病床使用率{' '}
            {((element.inpatient / element.secure_bed) * 100).toFixed(2)} % (参考)
          </h2>
          <PieChartComponent data={data} element={element}/>
  
          <p>PCR検査陽性者数：{element.pcr_positive.toLocaleString()}人</p>
          <p>うち重症者数：{element.injured.toLocaleString()}人</p>
          <p>入院患者受入確保病床：{element.secure_bed.toLocaleString()}床</p>
          <p>入院者数：{element.inpatient.toLocaleString()}人</p>
          <p style={{ wordBreak: 'break-all' }}>出典：{element.source}</p>
          <p>最終更新日：{element.update}</p>
        </Modal>
      </div>
    );
  };