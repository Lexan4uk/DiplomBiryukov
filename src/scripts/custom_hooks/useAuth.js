import { useRecoilState } from 'recoil';
import { isAuthorisedState } from '@scripts/atoms/authState';
import { login } from "@api/login"
import { accDataAtom } from '@scripts/atoms/accDataAtom'
import { useEffect } from 'react';


function useAuth() {
  const [isAuthorised, setIsAuthorised] = useRecoilState(isAuthorisedState);
  const [accData, setAccData] = useRecoilState(accDataAtom)

  const initUser = async () => {
    const token = localStorage.getItem('token');
    if (!isAuthorised && token) {
      const responseLogin = await login();
      if (responseLogin.code === 201 || responseLogin.code === 404) {
        setIsAuthorised(false)
        localStorage.removeItem('token');
        return
      }
      if (responseLogin) {
        setIsAuthorised(true);
        setAccData(responseLogin);
      }
    }
    else {
      setIsAuthorised(false)
    }
  }
  useEffect(() => {
    console.log(accData)
}, [accData])
  return {
    isAuthorised,
    initUser,
    accData,
  };
}

export default useAuth;
