
import React from 'react';
import { Balances } from '../types';

interface BalancesWidgetProps {
  balances: Balances;
}

const BalancesWidget: React.FC<BalancesWidgetProps> = ({ balances }) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-center">
      <div>
        <p className="text-sm text-gray-500">SOL</p>
        <p className="text-3xl md:text-4xl font-bold text-black">{balances.sol.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">KINGLEY</p>
        <p className="text-3xl md:text-4xl font-bold text-black">{balances.kingley.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default BalancesWidget;