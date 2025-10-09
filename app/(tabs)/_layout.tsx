import { Tabs } from 'expo-router';
import { Redirect } from 'expo-router';
import Colors from '@/src/design/tokens/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeIcon from '../../assets/Icons/tab-bar/home.svg';
import BooksIcon from '../../assets/Icons/tab-bar/books.svg';
import UsersIcon from '../../assets/Icons/tab-bar/users.svg';


export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerShadowVisible: false,
                tabBarActiveTintColor: Colors.dark.tabIconSelected,
                tabBarInactiveTintColor: Colors.dark.tabIconDefault,
                tabBarActiveBackgroundColor: Colors.dark.tabBarActiveBackgroundColor,
                tabBarStyle: {
                    height: 73 + insets.bottom,
                    paddingBottom: insets.bottom,
                    backgroundColor: Colors.dark.tabBarBackground,
                    borderTopColor: '#313333',
                    elevation: 0,
                    shadowColor: '#000',
                    shadowOpacity: 0,
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 0,
                },
                tabBarIconStyle: {
                    marginTop: 10,
                },
                tabBarLabelStyle: {
                    fontFamily: 'PoppinsMedium',
                    fontSize: 12,
                    marginBottom: 10,
                },
            }}>
            <Tabs.Screen
                name="Home/index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <HomeIcon width={20} height={20} color={focused ? Colors.dark.primary['400'] : "#C4CCCC"} />
                    ),
                }}
            />

            <Tabs.Screen
                name="Categories/index"
                options={{
                    title: 'Categorias',
                    tabBarIcon: ({ color, focused }) => <BooksIcon width={20} height={20} color={focused ? Colors.dark.primary['400'] : "#C4CCCC"} />,
                }}
            />

            <Tabs.Screen
                name="Users/index"
                options={{
                    title: 'Usuários',
                    tabBarIcon: ({ color, focused }) => <UsersIcon width={20} height={20} color={focused ? Colors.dark.primary['400'] : "#C4CCCC"} />,
                }}
            />
        </Tabs>
    );
}
