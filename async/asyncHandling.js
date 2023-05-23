//Promise가 없던 시절 calllback을 처리하는 방법
/*
  이 코드의 문제점?
  - 성공하는 경우와 실패하는 경우가 섞여서 처리
  
  - 코드를 작성하는 입장에서 매번 애러의 유무를 확인해야 한다.
*/
function fetchAccounts(callback) {
  fetchUserEntity((err, user) => {
    // 콜백 함수를 인자로 받아서
    if (err !== null) {
      // 에러가 있는 경우 에러를 emit
      callback(err, null);
      return;
    }
    fetchUserAccounts(user.no, (err, accounts) => {
      // 콜백 함수를 인자로 받아서
      if (err != null) {
        // 에러가 있는 경우 에러를 emit
        callback(err, null);
        return;
      }
      callback(null, accounts);
    });
  });
}

// async await을 이용한 에러처리
/*
 - 성공하는 경우만 다루고, 실패하는 경우는 catch절에서 분리해 처리
 
 - 실패하는 경우에 대한 처리를 외부에 위임할 수 있다.
*/
async function fetchAccounts() {
  const user = await fetchUserEntity();
  const accounts = await fetchUserAccounts(user.no);
  return accounts;
}

// 일반적인  비동기 함수
/*
 - 성공하는 경우에만 집중해 복잡도를 낮춘다.,
 -  일반적으로 작성하는 동기 로직과 큰 차이가 없다.
*/
