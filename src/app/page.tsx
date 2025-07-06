'use client';

import dynamic from 'next/dynamic';
import NavigationWrapper from '@/components/NavigationWrapper';
// Static imports for smaller components
import { DisclaimerText } from '@/components/DisclaimerText';
import { VersionDisplay } from '@/components/VersionDisplay';
import FactionButton from '@/components/ui/FactionButton';
import FactionButtonGroup from '@/components/ui/FactionButtonGroup';
import { factions, characters, factionCards, cards } from '@/data';
import { AppProvider, useAppContext } from '@/context/AppContext';
import { EditModeProvider, useEditMode } from '@/context/EditModeContext';

// Dynamic imports for large components - code splitting
const CharacterGrid = dynamic(
  () => import('@/components/displays/characters').then((mod) => ({ default: mod.CharacterGrid })),
  {
    loading: () => <div className='animate-pulse bg-gray-200 rounded-lg h-32 w-full'></div>,
    ssr: false,
  }
);

const CharacterDetails = dynamic(
  () =>
    import('@/components/displays/characters').then((mod) => ({ default: mod.CharacterDetails })),
  {
    loading: () => <div className='animate-pulse bg-gray-200 rounded-lg h-64 w-full'></div>,
    ssr: false,
  }
);

const KnowledgeCardGrid = dynamic(
  () =>
    import('@/components/displays/knowledge-cards').then((mod) => ({
      default: mod.KnowledgeCardGrid,
    })),
  {
    loading: () => <div className='animate-pulse bg-gray-200 rounded-lg h-32 w-full'></div>,
    ssr: false,
  }
);

const KnowledgeCardDetails = dynamic(
  () =>
    import('@/components/displays/knowledge-cards').then((mod) => ({
      default: mod.KnowledgeCardDetails,
    })),
  {
    loading: () => <div className='animate-pulse bg-gray-200 rounded-lg h-64 w-full'></div>,
    ssr: false,
  }
);

export default function Home() {
  return (
    <AppProvider>
      <EditModeProvider>
        <HomeContent />
      </EditModeProvider>
    </AppProvider>
  );
}

function HomeContent() {
  const { activeTab, selectedCharacter, selectedCard, isDetailedView, handleTabChange } =
    useAppContext();
  const { toggleEditMode, isEditMode } = useEditMode();

  // Render content based on state
  const renderContent = () => {
    // If a card is selected, show card details
    if (selectedCard && cards[selectedCard]) {
      return <KnowledgeCardDetails card={cards[selectedCard]} isDetailedView={isDetailedView} />;
    }

    // If a character is selected, show character details
    if (selectedCharacter && characters[selectedCharacter]) {
      // Pass the isDetailedView state to the CharacterDetails component
      return <CharacterDetails character={characters[selectedCharacter]} />;
    } // If card tabs are active, show faction cards
    if (activeTab === 'catCards' && factionCards['cat']) {
      return <KnowledgeCardGrid key='cat-cards' faction={factionCards['cat']} />;
    }

    if (activeTab === 'mouseCards' && factionCards['mouse']) {
      return <KnowledgeCardGrid key='mouse-cards' faction={factionCards['mouse']} />;
    }

    // If a faction tab is active, show faction characters
    if (activeTab && factions[activeTab]) {
      return <CharacterGrid faction={factions[activeTab]} />;
    }

    // Default: show home page content
    return (
      <div className='space-y-8'>
        {' '}
        {/* Padding for navbar is now handled at the page level */}
        <header className='text-center space-y-4 px-4'>
          <h1 className='text-4xl font-bold text-blue-600 py-3'>猫和老鼠手游wiki</h1>
          <p className='text-xl text-gray-600 px-4 py-2'>查询角色技能和知识卡效果</p>
        </header>{' '}
        <div className='flex flex-col items-center mt-16 px-4'>
          <h2 className='text-3xl font-bold mb-10 py-3 text-gray-800'>角色</h2>
          <FactionButtonGroup>
            <FactionButton
              imageSrc='/images/icons/cat faction.png'
              imageAlt='猫阵营图标'
              title='猫阵营'
              description='猫阵营角色列表'
              onClick={() => handleTabChange('cat')}
              ariaLabel='猫阵营角色列表'
            />
            <FactionButton
              imageSrc='/images/icons/mouse faction.png'
              imageAlt='鼠阵营图标'
              title='鼠阵营'
              description='鼠阵营角色列表'
              onClick={() => handleTabChange('mouse')}
              ariaLabel='鼠阵营角色列表'
            />
          </FactionButtonGroup>
        </div>{' '}
        <div className='flex flex-col items-center mt-16 px-4'>
          <h2 className='text-3xl font-bold mb-10 py-3 text-gray-800'>知识卡</h2>
          <FactionButtonGroup>
            <FactionButton
              imageSrc='/images/icons/cat knowledge card.png'
              imageAlt='猫方知识卡图标'
              title='猫方知识卡'
              description='猫方知识卡列表'
              onClick={() => handleTabChange('catCards')}
              ariaLabel='猫方知识卡列表'
            />
            <FactionButton
              imageSrc='/images/icons/mouse knowledge card.png'
              imageAlt='鼠方知识卡图标'
              title='鼠方知识卡'
              description='鼠方知识卡列表'
              onClick={() => handleTabChange('mouseCards')}
              ariaLabel='鼠方知识卡列表'
            />
          </FactionButtonGroup>
        </div>
        {/* Division line before 网站说明 */}
        <div className='mt-24 mb-8 px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='h-px bg-gray-300 w-full'></div>
          </div>
        </div>
        <div
          className='mt-8 text-center px-4'
          onDoubleClick={() => {
            if (isEditMode) {
              // TODO: use a component instead
              alert('成功退出编辑模式');
            } else {
              alert('成功进入编辑模式，编辑模式将停止页面与服务器在线更新间的同步');
            }
            toggleEditMode();
          }}
        >
          <h2 className='text-3xl font-bold mb-6 py-2'>网站说明</h2>
          <p className='max-w-2xl mx-auto text-gray-600 px-4 py-3'>
            <DisclaimerText />
          </p>
          {process.env.NEXT_PUBLIC_BUILD_TIME && (
            <p className='text-sm text-gray-500 mt-4'>
              最近更新：{process.env.NEXT_PUBLIC_BUILD_TIME}
            </p>
          )}
          <VersionDisplay />
        </div>
      </div>
    );
  };

  return (
    <NavigationWrapper
      showDetailToggle={!!(selectedCharacter || selectedCard)} // Show toggle when a character or card is selected
    >
      {/* Render content based on state */}
      {renderContent()}
    </NavigationWrapper>
  );
}
