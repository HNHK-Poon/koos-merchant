import { useAccountService, useWalletService } from '@/infrastructure/hook/useService';
import { selectAsset } from '@/infrastructure/state/asset';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AssetWidget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asset = useSelector(selectAsset);
  const walletSerice: any = useWalletService();
  const accountService = useAccountService();
  const [walletBalance, setWalletBalance] = useState(0);
  const getOwnMerchantList = async () => {
    const { data } = await accountService.getOwnMerchantList();
    console.log(data.list);
    const selectedMerchantId = data.list[0].merchantId;
    const { data: merchantWallet } = await accountService.getMerchantWalletBalance(selectedMerchantId);
    console.log(merchantWallet);
    setWalletBalance(merchantWallet.amount);
  };
  useEffect(() => {
    getOwnMerchantList();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-light-xl text-base font-semibold">Total Assets</p>
      <p className="text-4xl font-bold text-light-xl -mt-2">RM{walletBalance?.toFixed(2)}</p>
      {/* <p className='text-light-m text-xs -mt-1'>RM{asset.Amount.toFixed(2)} in cash</p> */}
    </div>
  );
};

AssetWidget.propTypes = {};

export default AssetWidget;
