
/*
 _____          _     _                      _____       _   _                     
|_   _|        (_)   | |                    |  _  |     | | (_)                    
  | | _ __  ___ _  __| | ___ _ __   ______  | | | |_ __ | |_ _ _ __ ___  _   _ ___ 
  | || '_ \/ __| |/ _` |/ _ \ '__| |______| | | | | '_ \| __| | '_ ` _ \| | | / __|
 _| || | | \__ \ | (_| |  __/ |             \ \_/ / |_) | |_| | | | | | | |_| \__ \
 \___/_| |_|___/_|\__,_|\___|_|              \___/| .__/ \__|_|_| |_| |_|\__,_|___/
                                                  | |                              
                                                  |_|                              

                                BootCamp '25 - Lesson 2
*/


//* Callback
const callbackFunc = (callback) => {
    console.log('test');
    callback();
    };

callbackFunc(() => { console.log('callback') });

//* Callback Hell Problemi
const runSteps = (callback) => {
    const step = (stepNumber, nextStep) => {
        setTimeout(() => {
            console.log(`Adım ${stepNumber} tamamlandı`);
            if (nextStep) nextStep();
        }, 1000);
    };

    step(1, () => {
        step(2, () => {
            step(3, () => {
                step(4, () => {
                    console.log("Tüm adımlar tamamlandı!");
                    if (callback) callback();
                });
            });
        });
    });
};

runSteps(() => console.log("Bütün işlemler bitti!"));

//* Promise Yapısı

const runSteps = () => {
    const step = (stepNumber) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Adım ${stepNumber} tamamlandı`);
                resolve();
            }, 1000);
        });
    };

    step(1)
        .then(() => step(2))
        .then(() => step(3))
        .then(() => step(4))
        .then(() => console.log("Tüm adımlar tamamlandı!"))
        .catch((error) => console.error("Hata oluştu:", error));
};

runSteps();


const runSteps = async () => {
    const step = (stepNumber) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Adım ${stepNumber} tamamlandı`);
                resolve();
            }, 1000);
        });
    };

    try {
        await step(1);
        await step(2);
        await step(3);
        await step(4);
        console.log("Tüm adımlar tamamlandı!");
    } catch (error) {
        console.error("Hata oluştu:", error);
    }
};

runSteps();

//* Senkron vs Asenkron JavaScript

//! Senkron JavaScript (blocking)
console.log("🚀 1. İşlem başladı");

const uzunSurenIslem = () => {
  for (let i = 0; i < 1e10; i++) {} // CPU'yu meşgul eden loop
  console.log("✅ 2. Uzun süren işlem tamamlandı");
};

uzunSurenIslem();

console.log("🎯 3. İşlem tamamlandı");


//! Asenkron JavaScript (Non-blocking)
console.log("🚀 1. İşlem başladı");

setTimeout(() => console.log("✅ 2. Asenkron işlem tamamlandı"), 2000);

console.log("🎯 3. İşlem tamamlandı");


//! Promise ile Asenkron İşlem
console.log("🚀 1. İşlem başladı");

const veriCek = () => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log("✅ 2. Veri çekildi");
        if (1 == 2) {
            resolve();
        } else {
            reject();
        }
    }, 2000);
  });
};

veriCek().then(() => console.log("🎯 3. İşlem tamamlandı")).catch(()=> console.log('error'));
console.log("🎯 4. İşlem tamamlandı");



//! async / await ile Modern Asenkron İşlem (ES6+)
console.log("🚀 1. İşlem başladı");

const veriCek = async () => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log("✅ 2. Veri çekildi");
      if (1 == 1) {
        resolve('data');
    } else {
        reject('error');
    }
    }, 2000);
  });
};

const islem = async () => {
  await veriCek().then((response) => console.log(response)).catch((error)=> console.log(error));
  console.log("🎯 3. İşlem tamamlandı");
};

console.log("🎯 4. İşlem tamamlandı");

islem();
//?-----?//



