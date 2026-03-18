import { useState } from "react";
import {
  ChakraProvider,
  extendTheme,
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Container,
} from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Black Han Sans', sans-serif`,
    body: `'DM Sans', sans-serif`,
  },
  colors: {
    brand: {
      pink: "#FF2D78",
      purple: "#7B2FBE",
      deep: "#0D0D0D",
      light: "#F5F0FF",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#0D0D0D",
        color: "#F5F0FF",
      },
    },
  },
});

type Ingredient = {
  amount?: number;
  title: string;
};

type Step = {
  ingredients?: Set<Ingredient>;
  use: string;
};

type Recipe = {
  title: string;
  ingredients: Array<Ingredient>;
  steps: Array<Step>;
  servings: number;
};

function createIngredient(params: {
  amount?: number;
  title: string;
}): Ingredient {
  return {
    amount: params.amount,
    title: params.title,
  };
}

function createStep(params: {
  ingredients?: Set<Ingredient>;
  use: string;
}): Step {
  return {
    ingredients: params.ingredients,
    use: params.use,
  };
}

function createRecipe(
  title: string,
  ingredients: Array<Ingredient>,
  steps: Array<Step>,
  servings: number = 4,
): Recipe {
  return {
    title,
    ingredients,
    steps,
    servings,
  };
}

function scaleRecipe(recipe: Recipe, mult: number): Recipe {
  return {
    ...recipe, // preserves other Recipe properties (id, author, etc.)
    ingredients: recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      amount: ingredient.amount ? ingredient.amount * mult : undefined,
    })),
    steps: recipe.steps.map((step) => ({
      ...step,
      ingredients: step.ingredients
        ? new Set(
            Array.from(step.ingredients).map((ingredient) => ({
              ...ingredient,
              amount: ingredient.amount ? ingredient.amount * mult : undefined,
            })),
          )
        : undefined,
    })),
  };
}

const MonteCristoIngredients: Array<Ingredient> = [
  createIngredient({ amount: 3, title: "slices Brioche Bread" }),
  createIngredient({ amount: 1, title: "tbsp Mayonnaise" }),
  createIngredient({ amount: 1, title: "tsp Dijon Mustard" }),
  createIngredient({ amount: 3, title: "tbsp Raspberry Jam" }),
  createIngredient({ amount: 2, title: "slices Sliced Swiss Cheese 2 oz" }),
  createIngredient({ amount: 2, title: "slices Sliced Deli Turkey 2 oz" }),
  createIngredient({ amount: 2, title: "slices Sliced Deli Ham 2 oz" }),
  createIngredient({ amount: 1, title: "Large Egg(s)" }),
  createIngredient({ amount: 1, title: "tbsp Milk" }),
  createIngredient({ amount: 2, title: "tsp Butter" }),
  createIngredient({ title: "Powdered Sugar garnish" }),
];

const MonteCristoSteps: Array<Step> = [
  createStep({
    ingredients: new Set([
      MonteCristoIngredients[1],
      MonteCristoIngredients[2],
      MonteCristoIngredients[3],
      MonteCristoIngredients[0],
    ]),
    use: "Spread mayonnaise on a single side of two slices of brioche bread. On the remaining slice of bread (which will be the middle of your sandwich) spread Dijon mustard on one side and raspberry jam on the other.",
  }),
  createStep({
    ingredients: new Set([
      createIngredient({
        amount: 2,
        title: "slices of mayo slathered bread",
      }),
      MonteCristoIngredients[4],
      MonteCristoIngredients[5],
      MonteCristoIngredients[6],
      createIngredient({
        amount: 1,
        title: "slice(s) of dijon and jam slathered bread",
      }),
    ]),
    use: "Make the sandwiches by layering a slice of mayo slathered bread, cheese, ham, the dijon and raspberry slice of bread, followed by turkey, cheese, and the final slice of mayo slathered bread.",
  }),
  createStep({
    use: "Press down the sandwich to help flatten the thick slices of bread with a grill press or skillet.",
  }),
  createStep({
    ingredients: new Set([
      createIngredient({ amount: 1, title: "sandwhich" }),
      MonteCristoIngredients[7],
      MonteCristoIngredients[8],
    ]),
    use: "In a shallow dish, whisk together the eggs and the milk. Dip sandwich into the egg mixture, until some of the liquid absorbs into the bread, but it isn’t falling apart. ",
  }),
  createStep({
    ingredients: new Set([
      MonteCristoIngredients[9],
      createIngredient({ amount: 1, title: "sandwhich" }),
    ]),
    use: "Put the butter over medium heat in a large nonstick skillet. Cook 3-4 minutes per side, until sandwich is golden and cheese is melted. Transfer to paper towels to drain.",
  }),
  createStep({
    ingredients: new Set([
      MonteCristoIngredients[10],
      createIngredient({ amount: 1, title: "sandwhich" }),
    ]),
    use: "Dust sandwich with powdered sugar, slice in half, and serve with leftover jam on the side.",
  }),
];

const MonteCristo: Recipe = createRecipe(
  "Monte Cristo",
  MonteCristoIngredients,
  MonteCristoSteps,
);

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      {/* Google Fonts — drop this in your index.html instead if you prefer */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=DM+Sans:wght@400;500&display=swap');
      `}</style>

      <Box
        minH="100vh"
        bgGradient="linear(to-br, #0D0D0D, #1a0a2e)"
        position="relative"
        overflow="hidden"
      >
        {/* Geometric background shapes */}
        <Box
          position="absolute"
          top="-100px"
          right="-100px"
          w="400px"
          h="400px"
          border="2px solid"
          borderColor="brand.pink"
          transform="rotate(45deg)"
          opacity={0.15}
        />
        <Box
          position="absolute"
          bottom="-80px"
          left="-80px"
          w="300px"
          h="300px"
          border="2px solid"
          borderColor="brand.purple"
          transform="rotate(20deg)"
          opacity={0.15}
        />

        <Container maxW="600px" py={20} position="relative">
          <VStack gap={10} align="stretch">
            {/* Header */}
            <Box>
              <Box display="inline-block" bg="brand.pink" px={3} py={1} mb={3}>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="widest"
                  color="black"
                  textTransform="uppercase"
                >
                  Recipe Scaler
                </Text>
              </Box>
              <Heading
                fontSize="6xl"
                lineHeight={1}
                letterSpacing="-2px"
                textTransform="uppercase"
              >
                Scale
                <Box as="span" color="brand.pink">
                  {" "}
                  Your
                </Box>
                <br />
                Recipe.
              </Heading>
            </Box>

            {/* Input area */}
            <VStack gap={4} align="stretch">
              <Box>
                <Text
                  fontSize="xs"
                  letterSpacing="widest"
                  textTransform="uppercase"
                  mb={2}
                  color="brand.purple"
                  fontWeight="bold"
                >
                  Servings
                </Text>
                <Input
                  type="number"
                  placeholder="How many people?"
                  border="2px solid"
                  borderColor="brand.purple"
                  borderRadius="none"
                  bg="transparent"
                  color="brand.light"
                  size="lg"
                  _focus={{
                    borderColor: "brand.pink",
                    boxShadow: "none",
                  }}
                  _placeholder={{ color: "whiteAlpha.400" }}
                />
              </Box>

              <Button
                bg="brand.pink"
                color="black"
                borderRadius="none"
                size="lg"
                fontWeight="bold"
                letterSpacing="widest"
                textTransform="uppercase"
                _hover={{ bg: "brand.purple", color: "white" }}
                transition="all 0.15s"
              >
                Scale It
              </Button>
            </VStack>

            {/* Placeholder results area */}
            <Box
              border="2px solid"
              borderColor="whiteAlpha.200"
              p={6}
              position="relative"
            >
              <Box
                position="absolute"
                top="-1px"
                left="0"
                w="40px"
                h="2px"
                bg="brand.pink"
              />
              <Text color="whiteAlpha.400" fontSize="sm" letterSpacing="wide">
                Your scaled ingredients will appear here...
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
