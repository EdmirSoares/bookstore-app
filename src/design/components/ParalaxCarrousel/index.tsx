import * as React from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const defaultDataWith6Colors = ['#B0604D', '#899F9C', '#B3C680', '#5C6265', '#F5D399', '#F1F1F1'];

import { ImageStyle, StyleProp } from 'react-native';
import { CarouselRenderItem } from 'react-native-reanimated-carousel';
import { window } from '@/src/shared/constants/ScreenSizes';
import { SlideItem } from '../CategoriesList/RenderItem';

interface Options {
    colorFill?: boolean;
    rounded?: boolean;
    style?: StyleProp<ImageStyle>;
}

export const renderItem =
    ({ rounded = false, colorFill = false, style }: Options = {}): CarouselRenderItem<any> =>
    ({ index }: { index: number }) => (
        <SlideItem
            key={index}
            index={index}
            rounded={rounded}
            colorFill={colorFill}
            style={style}
        />
    );

function ParallaxCarrousel() {
    const progress = useSharedValue<number>(0);

    return (
        <View id="carousel-component">
            <Carousel
                autoPlayInterval={2000}
                data={defaultDataWith6Colors}
                height={258}
                loop={true}
                pagingEnabled={true}
                snapEnabled={true}
                width={window.width}
                style={{
                    width: window.width,
                }}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                onProgressChange={progress}
                renderItem={renderItem({ rounded: true })}
            />
        </View>
    );
}

export default ParallaxCarrousel;
