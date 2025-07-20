'use server';
import CharacterSection from '@/components/displays/characters/character-detail/CharacterSection';
import StyledMDX from '@/components/ui/StyledMDX';
import { DocPage } from '@/lib/docUtils';

function EmptyH1() {
  return null;
}

export default async function CharacterDocs({ docPage }: { docPage: DocPage }) {
  const { default: Component } = await import(`@/app/docs/${docPage.slug}/page.mdx`);

  return (
    <CharacterSection title='玩法指导' to={`/docs/${encodeURIComponent(docPage.slug)}`}>
      <StyledMDX>
        <Component components={{ h1: EmptyH1 }}></Component>
      </StyledMDX>
    </CharacterSection>
  );
}
