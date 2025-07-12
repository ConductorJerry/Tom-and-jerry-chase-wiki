// Define types for better type safety
export type FactionId = 'cat' | 'mouse';

export type Faction = {
  id: FactionId;
  name: string;
  description: string;
  detailedDescription?: string;
};

// Positioning tag types separated by faction
export type CatPositioningTagName = '进攻' | '防守' | '追击' | '打架' | '速通' | '翻盘' | '后期';
export type MousePositioningTagName = '奶酪' | '干扰' | '辅助' | '救援' | '破局' | '砸墙' | '后期';

export type CatPositioningTag = {
  tagName: CatPositioningTagName;
  isMinor: boolean; // Whether the character only partially exhibits this positioning's characteristics
  description: string; // Brief explanation of why this character has this specific positioning
  additionalDescription: string; // Extended description for detailed view mode
};

export type MousePositioningTag = {
  tagName: MousePositioningTagName;
  isMinor: boolean; // Whether the character only partially exhibits this positioning's characteristics
  description: string; // Brief explanation of why this character has this specific positioning
  additionalDescription: string; // Extended description for detailed view mode
};

// Union type for backward compatibility
export type PositioningTagName = CatPositioningTagName | MousePositioningTagName;
export type PositioningTag = CatPositioningTag | MousePositioningTag;

// Skill allocation types
export type SkillAllocation = {
  id: string;
  pattern: string; // Format: "021112200" or "013(0)3301-1"
  weaponType: 'weapon1' | 'weapon2'; // Which weapon this allocation uses
  description: string;
  additionaldescription?: string;
};

// Skill types - both for definitions and final processed skills
export type SkillType = 'active' | 'weapon1' | 'weapon2' | 'passive';

export type SkillLevel = {
  level: number;
  description: string;
  detailedDescription?: string;
  cooldown?: number;
};

// Raw skill definition (without ID, for character definitions)
export type SkillDefinition = {
  name: string;
  type: SkillType;
  aliases?: string[]; // Alternative names for search
  description?: string; // Basic description (optional, especially for passive skills)
  detailedDescription?: string; // Detailed description for detailed view
  imageUrl?: string; // Skill icon image URL
  videoUrl?: string; // Skill video URL (external link)

  // Skill usage properties
  canMoveWhileUsing?: boolean; // 移动释放
  canUseInAir?: boolean; // 空中释放
  cancelableSkill?: string; // 可取消释放
  cancelableAftercast?: string; // 可取消后摇
  canHitInPipe?: boolean; // 可击中管道中的角色
  cooldownTiming?: '前摇前' | '释放时' | '释放后'; // 进入CD时机

  skillLevels: SkillLevel[];
};

// Final processed skill (with ID assigned)
export type Skill = SkillDefinition & {
  id: string;
};

export type KnowledgeCardGroup = {
  cards: string[];
  description?: string;
};

export type KnowledgeCardGroupSet = {
  id: string;
  description: string;
  detailedDescription?: string;
  groups: KnowledgeCardGroup[];
  defaultFolded: boolean;
};

// Character definition type (without id, for raw definitions)
export type CharacterDefinition = {
  description: string;
  imageUrl?: string; // We'll generate it automatically
  aliases?: string[]; // Alternative names for search

  // Common attributes for all characters
  maxHp?: number; // Hp上限
  attackBoost?: number; // 攻击增伤
  hpRecovery?: number; // Hp恢复
  moveSpeed?: number; // 移速
  jumpHeight?: number; // 跳跃

  // Cat-specific attributes
  clawKnifeCdHit?: number; // 爪刀CD (命中)
  clawKnifeCdUnhit?: number; // 爪刀CD (未命中)
  clawKnifeRange?: number; // 爪刀范围

  // Mouse-specific attributes
  cheesePushSpeed?: number; // 推速
  wallCrackDamageBoost?: number; // 墙缝增伤

  // Positioning tags (faction-specific)
  catPositioningTags?: CatPositioningTag[]; // For cat characters
  mousePositioningTags?: MousePositioningTag[]; // For mouse characters

  // Skill allocations
  skillAllocations?: SkillAllocation[];

  skills: SkillDefinition[];

  // Knowledge card suggestions
  knowledgeCardGroups: (KnowledgeCardGroup | KnowledgeCardGroupSet)[];
};

export type PartialCharacterDefinition = { hidden: true } & Partial<CharacterDefinition>;

// Final processed character (with ID and processed skills)
export type Character = CharacterDefinition & {
  id: string; // Chinese name (e.g., '汤姆')
  factionId?: FactionId; // Optional in base definition, will be assigned in bulk
  skills: Skill[]; // Processed skills with IDs
};

// Card-related types
export type CardRank = 'C' | 'B' | 'A' | 'S';

export type CardLevel = {
  level: number;
  description: string;
  detailedDescription?: string;
};

export type Card = {
  id: string; // Chinese name without rank prefix (e.g., '乘胜追击')
  factionId?: FactionId; // Optional in base definition, will be assigned in bulk
  rank: CardRank;
  cost: number;
  description: string;
  detailedDescription?: string;
  imageUrl?: string; // We'll generate it automatically
  levels: CardLevel[];
};
