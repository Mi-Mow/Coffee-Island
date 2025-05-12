// const cafeImages = {
//     beitou_1_1: require('./1-1.jpg'),
//     beitou_1_2: require('./1-2.jpg'),
//     beitou_1_3: require('./1-3.jpg'),
//     beitou_2_1: require('./2-1.jpg'),
//     beitou_2_2: require('./2-2.jpg'),
//     beitou_2_3: require('./2-3.jpg'),
//     beitou_3_1: require('./3-1.jpg'),
//     beitou_3_2: require('./3-2.jpg'),
//     beitou_3_3: require('./3-3.jpg'),
// }

const cafeImages = import.meta.glob('../cafe/*.jpg', { eager: true });

const imageMap = {};
for (const path in cafeImages) {
    const fileName = path.split('/').pop().replace('.jpg', '');
    imageMap[fileName] = cafeImages[path]?.default;
}

export default imageMap;